package com.tvgame; // replace com.your-app-name with your app’s name


import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.net.InetSocketAddress;
import java.net.URI;
import java.net.URISyntaxException;


public class SocketModule extends ReactContextBaseJavaModule {
    SocketServer server;
    SocketClient client;
    private final ReactApplicationContext reactContext;

    @RequiresApi(api = Build.VERSION_CODES.M)
    SocketModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;

    }

    @Override
    @NonNull
    public String getName() {
        return "SocketModule";
    }

    @ReactMethod
    public void startServer(Integer port) {
        InetSocketAddress inetSockAddress = new InetSocketAddress(port);
        //InetSocketAddress inetSockAddress = new InetSocketAddress("10.0.0.15", port);
        server = new SocketServer(inetSockAddress, reactContext);
        server.start();
    }

    @ReactMethod
    public void broadcastMessage(String message) {
        server.broadcastMessage(message);
    }

    @ReactMethod
    public void attachClient(String uri) throws URISyntaxException {
        client = new SocketClient(new URI(uri), reactContext);
        client.connect();
    }

    @ReactMethod
    public void sendMessage(String message) {
        client.sendMessage(message);
    }

    @ReactMethod
    public void disconnectClient() {
        client.close();
    }

    @ReactMethod
    public void stopServer() throws InterruptedException {
        server.stop();
    }
}