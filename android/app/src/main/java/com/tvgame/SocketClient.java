package com.tvgame;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.net.InetSocketAddress;
import java.net.URI;

public class SocketClient extends WebSocketClient {
    ReactApplicationContext reactContext;

    public SocketClient(URI uri, ReactApplicationContext reactContext) {
        super(uri);
        this.reactContext = reactContext;
    }

    @Override
    public void onOpen(ServerHandshake handshakedata) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ClientOnOpen", handshakedata.getHttpStatusMessage());
    }

    @Override
    public void onMessage(String message) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ClientOnMessage", message);
    }

    @Override
    public void onClose(int code, String reason, boolean remote) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ClientOnClose", "Connection closed with code" + code + " and reason " + reason + " by " + (remote ? "host" : "client"));
    }

    @Override
    public void onError(Exception ex) {
        ex.printStackTrace();
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ClientOnError", ex.getMessage());
    }


    public void sendMessage(String message) {
        this.send(message);
    }
}
