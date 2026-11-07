import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_BASE_URL_MEDIA;
const token = Cookies.get("buuid") || "";

export const socket = io(URL, {
    path: "/api/v1/socket.io",
    auth: { token },
    transports: ['websocket'],
    autoConnect: false,
}); 