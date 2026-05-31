// Mock to bypass Turbopack compilation errors for Kysely adapter
export function getKyselyDatabaseType() {
	return "sqlite";
}
export function createKyselyAdapter() {
	return null;
}
export const kyselyAdapter = null;
