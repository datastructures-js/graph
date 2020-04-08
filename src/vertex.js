/**
 * @class Vertex
 * represents the node in a graph
 */
class Vertex {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  /**
   * @public
   * @returns {number|string}
   */
  getKey() {
    return this.key;
  }

  /**
   * @public
   * @returns {object}
   */
  getValue() {
    return this.value;
  }
}

module.exports = Vertex;
