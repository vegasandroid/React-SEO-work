import cluster from 'cluster';
import os from 'os';
import http from 'http';
import { startCluster } from './startServer';

function getStubCpus(count) {
  return Array.from({ length: count }, () => {
    return {
      model: 'Intel(R) Core(TM) i5-5287U CPU @ 2.90GHz',
      speed: 2900,
      times: {
        user: 12218950,
        nice: 0,
        sys: 6667850,
        idle: 49101690,
        irq: 0,
      },
    };
  });
}

describe('Starting the service', () => {
  const cpusArray = getStubCpus(5);
  let forkSpy;
  let cpusSpy;
  let serverStartStub;
  const mockWorker = {
    id: 1,
    process: {
      pid: 1234,
    },
  };

  const fakeServerListener = jest.fn();
  const fakeServer = {
    listen: () => fakeServerListener(),
    removeListener: () => {},
    on: () => {},
  };

  beforeEach(() => {
    process.env.NODE_ENV = 'production';
    forkSpy = jest.spyOn(cluster, 'fork').mockImplementation();
    cpusSpy = jest.spyOn(os, 'cpus').mockImplementation(() => cpusArray);
    serverStartStub = jest
      .spyOn(http, 'createServer')
      .mockImplementation(() => fakeServer);
  });

  afterEach(done => {
    process.env.NODE_ENV = 'development';
    forkSpy.mockRestore();
    cpusSpy.mockRestore();
    serverStartStub.mockRestore();
    // eslint-disable-next-line no-underscore-dangle
    cluster._events.fork = [];
    // eslint-disable-next-line no-underscore-dangle
    cluster._events.exit = [];
    if (Object.keys(cluster.workers).length > 0) {
      cluster.disconnect(done);
    } else {
      done();
    }
  });

  describe('The parent service', () => {
    it('should initially create the correct number of child processes', () => {
      startCluster();
      expect(forkSpy).toHaveBeenCalledTimes(5);
    });

    it('should fork when a child process exits with code 0', () => {
      startCluster();
      cluster.emit('exit', mockWorker, 'SIGTERM');
      expect(forkSpy).toHaveBeenCalledTimes(cpusArray.length + 1);
    });

    it('should not fork when a child process exits voluntarily', () => {
      startCluster();
      mockWorker.exitedAfterDisconnect = true; // voluntary
      cluster.emit('exit', mockWorker, 'SIGTERM');
      expect(forkSpy).toHaveBeenCalledTimes(cpusArray.length);
    });
  });

  describe('the child processes', () => {
    const { isWorker } = cluster;

    beforeEach(() => {
      cluster.isWorker = true;
    });

    afterEach(() => {
      cluster.isWorker = isWorker;
    });

    it('should call the server start method', () => {
      startCluster();
      expect(fakeServerListener).toHaveBeenCalledTimes(1);
    });
  });
});
