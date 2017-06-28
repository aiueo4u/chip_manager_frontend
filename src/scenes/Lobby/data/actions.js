export const submitCreateTableForm = (tableName) => {
  return { type: "CREATE_TABLE_FORM_ON_SUBMIT", tableName: tableName };
}
