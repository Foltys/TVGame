package com.tvgame;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.java_websocket.WebSocket;
import org.java_websocket.exceptions.InvalidDataException;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.handshake.ServerHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;
import java.nio.channels.SelectionKey;

public class SocketServer extends WebSocketServer {
    ReactApplicationContext reactContext;
    DeviceEventManagerModule.RCTDeviceEventEmitter emitter;

    public SocketServer(InetSocketAddress address, ReactApplicationContext reactContext) {
        super(address);
        this.reactContext = reactContext;
        emitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        conn.send("Welcome to the server");
        broadcast("new connection: " + handshake.getResourceDescriptor());
        Log.d("Server", "Client connected");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        emitter.emit("ServerOnClose", "Connection closed with code" + code + " and reason " + reason + " by " + (remote ? "host" : "client"));
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        emitter.emit("ServerOnMessage", message);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        ex.printStackTrace();
        emitter.emit("ServerOnError", ex.getMessage());
    }

    @Override
    public void onStart() {
        emitter.emit("ServerOnStart", "Server Started");
        Log.d("Server", "Websocket started");
    }

    @Override
    public void onWebsocketHandshakeReceivedAsClient(WebSocket conn, ClientHandshake request, ServerHandshake response) throws InvalidDataException {
        Log.d("remote address", conn.getRemoteSocketAddress().toString());
        Log.d("local address", conn.getLocalSocketAddress().toString());
        super.onWebsocketHandshakeReceivedAsClient(conn, request, response);
    }
}
