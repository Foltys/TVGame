import { EmitterSubscription, NativeEventEmitter, NativeModule, NativeModules } from 'react-native'
const { SocketModule: SocketModuleJava } = NativeModules
type ServerEvents = 'ServerOnClose' | 'ServerOnMessage' | 'ServerOnError' | 'ServerOnStart'
type ClientEvents = 'ClientOnOpen' | 'ClientOnMessage' | 'ClientOnClose' | 'ClientOnError'
class SocketModuleServer extends NativeEventEmitter {
	constructor(nativeModule?: NativeModule) {
		super(nativeModule)
	}
	addListener(type: ServerEvents, listener: (data: any) => void, context?: any): EmitterSubscription {
		return super.addListener(type, listener, context)
	}
	startServer(port: number): Promise<string> {
		return SocketModuleJava.startServer(port)
	}
}
class SocketModuleClient extends NativeEventEmitter {
	constructor(nativeModule?: NativeModule) {
		super(nativeModule)
	}
	addListener(type: ClientEvents, listener: (data: any) => void, context?: any): EmitterSubscription {
		return super.addListener(type, listener, context)
	}
	attachClient(uri: string): Promise<string> {
		return SocketModuleJava.attachClient(uri)
	}
}

export { SocketModuleServer, SocketModuleClient }
