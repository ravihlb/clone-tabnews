test("GET api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const postgresVersion = responseBody.dependencies.database.version;
  expect(postgresVersion).toBeDefined();
  expect(postgresVersion).toEqual("16.1");

  const databaseMaxConnections =
    responseBody.dependencies.database.max_connections;
  expect(databaseMaxConnections).toEqual(100);

  const databaseOpenedConnections =
    responseBody.dependencies.database.opened_connections;
  expect(databaseOpenedConnections).toBeLessThanOrEqual(databaseMaxConnections);
  expect(databaseOpenedConnections).toEqual(1);
});
