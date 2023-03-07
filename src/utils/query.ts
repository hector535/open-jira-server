type Entity = { [property: string]: any };

type createUpdateByIdQueryParams = {
  tableName: string;
  idColumn: {
    name: string;
    value: number;
  };
  entity: Entity;
};

export const createUpdateByIdQuery = ({
  tableName,
  idColumn,
  entity,
}: createUpdateByIdQueryParams) => {
  const query = [`UPDATE ${tableName}`];
  query.push("SET");

  const set: string[] = [];
  const values: any[] = [];
  const keysWithoutId = Object.keys(entity).filter(
    (key) => key !== idColumn.name && key !== "user_id"
  );

  keysWithoutId.forEach((k, i) => {
    set.push(`${k} = $${i + 1}`);
    values.push(entity[k]);
  });

  values.push(idColumn.value);
  values.push(entity.user_id);

  query.push(set.join(", "));
  query.push(`WHERE ${idColumn.name} = $${keysWithoutId.length + 1}`);
  query.push(`AND user_id = $${keysWithoutId.length + 2}`);

  return {
    query: query.join(" "),
    values,
  };
};

type createInsertQueryParams = {
  tableName: string;
  entity: Entity;
  idColumnName: string;
};

export const createInsertQuery = ({
  tableName,
  entity,
  idColumnName,
}: createInsertQueryParams) => {
  const query = [`INSERT INTO ${tableName}`];

  const keysWithoutId = Object.keys(entity).filter((k) => k !== idColumnName);
  const columns: string[] = [];
  const parameters: string[] = [];
  const values: any[] = [];

  keysWithoutId.forEach((key, i) => {
    columns.push(`${key},`);
    parameters.push(`$${i + 1},`);
    values.push(entity[key]);
  });

  query.push(`(${columns.join("").slice(0, -1)})`);
  query.push("VALUES");
  query.push(`(${parameters.join("").slice(0, -1)})`);
  query.push(`RETURNING ${idColumnName};`);

  return { query: query.join(" "), values };
};
