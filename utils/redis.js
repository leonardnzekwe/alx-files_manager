import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis client.
 */
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
    this.client.on('ready', () => {
      this.isConnected = true;
    });
    this.Get = promisify(this.client.get).bind(this.client);
    this.SetExp = promisify(this.client.set).bind(this.client);
    this.Del = promisify(this.client.del).bind(this.client);
    this.isConnected = false;
  }

  /**
   * Checks if the Redis client is connected.
   * @returns {boolean} True if the client is connected, false otherwise.
   */
  isAlive() {
    return this.isConnected;
  }

  /**
   * Retrieves the value associated with the given key from Redis.
   * @param {string} key - The key to retrieve the value for.
   * @returns {Promise<any>} A promise that resolves to the value associated with the key.
   */
  async get(key) {
    return this.Get(key).then((value) => value);
  }

  /**
   * Sets the value associated with the given key in Redis.
   * @param {string} key - The key to set the value for.
   * @param {any} value - The value to set.
   * @param {number} [duration] - Optional duration (in seconds) for the key to expire.
   * @returns {Promise<void>} A promise that resolves when the value is set.
   */
  async set(key, value, duration) {
    await this.SetExp(key, value);
    if (duration) {
      await this.client.expire(key, duration);
    }
  }

  /**
   * Deletes the value associated with the given key from Redis.
   * @param {string} key - The key to delete.
   * @returns {Promise<void>} A promise that resolves when the value is deleted.
   */
  async del(key) {
    await this.Del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
// export default RedisClient
