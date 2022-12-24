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
  stores?: Store[];
  productStock?: ProductStock[];
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
  id: number | string;
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
  user?: string;
  pass?: String;
  idRowStore?: number | string;
  cantidadTotal?: number;
}
interface Proveedor {
  id: number;
  nombreProveedor: string;
  direccion: string;
  telefono: string;
}

interface Store {
  id: number;
  nombreDeLocal: string;
  direccion: string;
  codPostal: string;
}

interface StoresStock {
  LocalSanMartin: number;
  LocalSC60: number;
  LocalSC84: number;
  user?: string;
  pass?: string;
  idProducto?: number;
}

interface ProductStock {
  id: number;
  idProducto: number;
  idLocal: number;
  cantidadLocal: number;
  nombreDeLocal: string;
}
