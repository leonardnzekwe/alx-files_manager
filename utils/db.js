import { MongoClient } from 'mongodb';

/**
 * Represents a database client for the files_manager application.
 */
class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || '27017';
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(
      `mongodb://${this.host}:${this.port}/${this.database}`,
      { useUnifiedTopology: true },
    );
    this.client.connect();
    this.db = this.client.db(this.database);
  }

  /**
   * Checks if the database client is connected to the database.
   * @returns {boolean} True if the client is connected, false otherwise.
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<number>} The number of users.
   */
  async nbUsers() {
    const users = this.client.db(this.database).collection('users');
    const result = await users.countDocuments();
    return result;
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<number>} The number of files.
   */
  async nbFiles() {
    const files = this.client.db(this.database).collection('files');
    const result = await files.countDocuments();
    return result;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
