const generator = (function* id() {
  for (let i = 0; i < Infinity; i++) {
    yield i.toString();
  }
})();
export const id = () => generator.next().value;
