/** Respuesta del login (sin refresh; el refresh va en cookie HttpOnly) */
export interface LoginResponse {
    access: string;
    must_change_password: boolean;
    websites?: { id: number; name: string; type: string }[];
}

/** Usuario actual (GET /me o estado tras login) */
export interface User {
    id: number;
    email: string;
    user_type: string;
    tenant: { id: number; name: string } | null;
    must_change_password: boolean;
    date_joined: string | null;
}