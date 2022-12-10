package com.tvgame; // replace com.your-app-name with your app’s name


import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;


import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

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
    public String getName() {
        return "SocketModule";
    }

    @ReactMethod
    public void startServer(Integer port, Promise result) {
        String ipAddress = Utils.getIPAddress(true);
        InetSocketAddress inetSockAddress = new InetSocketAddress(ipAddress, port);
        //InetSocketAddress inetSockAddress = new InetSocketAddress("10.0.0.15", port);
        server = new SocketServer(inetSockAddress, reactContext);
        try {
            server.start();
            Log.d("Server address", server.getAddress().toString());
            result.resolve(server.getAddress().toString());
        } catch (IllegalStateException ise) {
            ise.printStackTrace();
            result.reject(ise);
        }
    }

    @ReactMethod
    public void attachClient(String uri, Promise result) throws URISyntaxException {
        try {
            client = new SocketClient(new URI(uri), reactContext);
            client.connect();
            result.resolve("Client connected");
        } catch (IllegalStateException ise) {
            result.reject(ise);
        }
    }
}