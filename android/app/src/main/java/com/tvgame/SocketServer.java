package com.tvgame;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
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
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ServerOnOpen", conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        Log.d("ServerOnClose", "Connection closed with code" + code + " and reason " + reason + " by " + (remote ? "host" : "client"));
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ServerOnClose", conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        Log.d("ServerOnMessage", message);
        WritableMap params = Arguments.createMap();
        params.putString("id", conn.getRemoteSocketAddress().getAddress().getHostAddress());
        params.putString("message", message);
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ServerOnMessage", params);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        ex.printStackTrace();
        Log.d("ServerOnError", ex.getMessage());
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ServerOnError", ex.getMessage());
    }

    @Override
    public void onStart() {
        String ipAddress = Utils.getIPAddress(true);
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ServerOnStart", ipAddress);
    }

    public void broadcastMessage(String message) {
        Log.d("Server broadcasts", message);
        this.broadcast(message);
    }

}
