/// <reference types="vite/client" />

export interface Props {
  children: JSX.Element;
}

export interface FetchResponse {
  ok: boolean;
  msg: string;
  userStatus?: string;
  categories?: Categories[];
  products?: Product[];
  proveedores?: Proveedor[];
}

export interface UserProps {
  user: string;
  pass: pass;
}
interface Categories {
  id: number;
  nombreCategoria: string;
}

interface Product {
  id: number;
  nombreProducto: string;
  sku: string;
  precio: number;
  cantidad: number;
  proveedor: string;
  fechaDeIngreso: string;
  fechaUltimaModificacion: string;
  categoria: string;
  img: string;
  local?: string;
  idLocal?: number;
}
interface Proveedor {
  id: number;
  nombreProveedor: string;
  direccion: string;
  telefono: string;
}
