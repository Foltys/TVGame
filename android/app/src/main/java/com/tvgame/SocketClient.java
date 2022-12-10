package com.tvgame;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.net.InetSocketAddress;
import java.net.URI;

public class SocketClient extends WebSocketClient {
    DeviceEventManagerModule.RCTDeviceEventEmitter emitter;

    public SocketClient(URI uri, ReactApplicationContext reactContext) {
        super(uri);
        emitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    @Override
    public void onOpen(ServerHandshake handshakedata) {
        emitter.emit("ClientOnOpen", handshakedata.getHttpStatusMessage());
    }

    @Override
    public void onMessage(String message) {
        emitter.emit("ClientOnMessage", message);
    }

    @Override
    public void onClose(int code, String reason, boolean remote) {
        emitter.emit("ClientOnClose", "Connection closed with code" + code + " and reason " + reason + " by " + (remote ? "host" : "client"));
    }

    @Override
    public void onError(Exception ex) {
        ex.printStackTrace();
        emitter.emit("ClientOnError", ex.getMessage());
    }
}
