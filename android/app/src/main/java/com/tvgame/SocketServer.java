package com.tvgame;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
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

    public SocketServer(InetSocketAddress address, ReactApplicationContext reactContext) {
        super(address);
        this.reactContext = reactContext;
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        conn.send("Welcome to the server");
        Log.d("New connection", conn.getLocalSocketAddress().toString() + conn.getRemoteSocketAddress().toString());
        broadcast("new connection: " + handshake.getResourceDescriptor());
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ServerOnOpen", "Connection opened " + conn.getRemoteSocketAddress().toString());
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        Log.d("ServerOnClose", "Connection closed with code" + code + " and reason " + reason + " by " + (remote ? "host" : "client"));
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ServerOnClose", "Connection closed with code" + code + " and reason " + reason + " by " + (remote ? "host" : "client"));
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        Log.d("ServerOnMessage", message);
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ServerOnMessage", message);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        ex.printStackTrace();
        Log.d("ServerOnError", ex.getMessage());
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ServerOnError", ex.getMessage());
    }

    @Override
    public void onStart() {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ServerOnStart", "Server Started");
    }

    public void broadcastMessage(String message) {
        Log.d("Server broadcasts", message);
        this.broadcast(message);
    }
}
