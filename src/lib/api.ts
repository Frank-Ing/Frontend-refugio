import type { Animal, AnimalInput } from '../types/animal';
import { clearToken, getToken } from './session';

const API_URL = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3000';

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));
  if (response.status === 401) clearToken();
  if (!response.ok) throw new ApiError(response.status, body.error ?? 'No se pudo completar la solicitud');
  return body as T;
}

export const api = {
  login: (data: { usuario: string; contrasena: string }) =>
    request<{ token: string }>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => request<{ mensaje: string }>('/auth/logout', { method: 'POST' }),
  listAnimals: (query = '') => request<Animal[]>(`/animals${query ? `?${query}` : ''}`),
  getAnimal: (id: number) => request<Animal>(`/animals/${id}`),
  createAnimal: (data: AnimalInput) => request<Animal>('/animals', { method: 'POST', body: JSON.stringify(data) }),
  updateAnimal: (id: number, data: AnimalInput) => request<Animal>(`/animals/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
