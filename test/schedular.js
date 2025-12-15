class Schedular {
  concurrencyLimit = 0;
  runningCount = 0;
  taskQueue = [];
  constructor(concurrencyLimit) {
    this.concurrencyLimit = concurrencyLimit;
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({
        task,
        resolve,
        reject,
      });
      this.processNext();
    });
  }

  async processNext() {
    if (
      this.runningCount >= this.concurrencyLimit ||
      this.taskQueue.length === 0
    ) {
      return;
    }
    this.runningCount++;
    const { task, resolve, reject } = this.taskQueue.shift();
    try {
      const res = await task();
      resolve(res);
    } catch (e) {
      reject(e);
    } finally {
      this.runningCount--;
      this.processNext();
    }
  }
}

export { Schedular };
