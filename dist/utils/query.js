export const createUpdateByIdQuery = ({ tableName, idColumn, entity, }) => {
    const query = [`UPDATE ${tableName}`];
    query.push("SET");
    const set = [];
    const values = [];
    const keysWithoutId = Object.keys(entity).filter((key) => key !== idColumn.name && key !== "user_id");
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
export const createInsertQuery = ({ tableName, entity, idColumnName, }) => {
    const query = [`INSERT INTO ${tableName}`];
    const keysWithoutId = Object.keys(entity).filter((k) => k !== idColumnName);
    const columns = [];
    const parameters = [];
    const values = [];
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
