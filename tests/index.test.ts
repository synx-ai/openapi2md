import convert from "../dist";

const fileThatExists = "./example/specs/petstore.json";
const fileThatNotExists = "./example/specs/fishstore.json";
const fileThatExistsButIsWrong = "./package.json";
const fileThatExistsInAnotherFormat = "./readme.md";

const templatesThatExists = "./example/templates/mdx";
const templatesThatNotExists = "./example/templates/jsx";

const urlThatExists = "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml";
const urlThatNotExists = "https://petstore3.synx.io/api/v3/openapi.json";

describe("convert()", () => {

  // this will execute from default options
  it("should execute from file", () => {
    return expect(convert(fileThatExists, { outPath: "./build" })).resolves.toBeUndefined();
  });

  // this will test a custom template options, also will test another parser
  it("should execute from file", () => {
    return expect(convert(fileThatExists, { outPath: "./build", templatesPath: templatesThatExists, prettierParser: "markdown" })).resolves.toBeUndefined();
  });

  // this will test a failed attempt to execute
  it("should reject from wrong template dir", () => {
    return expect(convert(fileThatExists, { outPath: "./build", templatesPath: templatesThatNotExists })).rejects.toBe("Can not find templates path");
  });

  // this will fail as file doesn't exists
  it("should reject from file", () => {
    return expect(convert(fileThatNotExists, { outPath: "./build" })).rejects.toBe("Can not load the content of the OpenAPI specification file");
  });

  // this will file because it can be loaded as JSON but isn't a valid schema
  it("should reject from wrong file", () => {
    return expect(convert(fileThatExistsButIsWrong, { outPath: "./build" })).rejects.toMatch("Invalid OpenAPI file");
  });

  // this will fail due to file validation
  it("should reject from wrong file", () => {
    return expect(convert(fileThatExistsInAnotherFormat, { outPath: "./build" })).rejects.toMatch("Can not parse the content");
  });

  // this will test a file load from web, also the format is YAML instead JSON, and will create examples
  it("should execute from url", () => {
    return expect(convert(urlThatExists, { outPath: "./build", snippetTargets: ["node", "python"] })).rejects.toBeDefined();
  });

  // this will fail to load a file from web
  it("should reject from url", () => {
    return expect(convert(urlThatNotExists, { outPath: "./build" })).rejects.toBe("Can not load the content of the OpenAPI specification file");
  });

});
