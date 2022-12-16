import { EmitterSubscription, NativeEventEmitter, NativeModule, NativeModules } from 'react-native'
const { SocketModule: SocketModuleJava } = NativeModules
type ServerEvents = 'ServerOnClose' | 'ServerOnMessage' | 'ServerOnError' | 'ServerOnStart'
type ClientEvents = 'ClientOnOpen' | 'ClientOnMessage' | 'ClientOnClose' | 'ClientOnError'
class SocketModuleServer extends NativeEventEmitter {
	address: string | null = null
	constructor(nativeModule?: NativeModule) {
		super(nativeModule)
	}
	addListener(type: ServerEvents, listener: (data: any) => void, context?: any): EmitterSubscription {
		return super.addListener(type, listener, context)
	}
	async startServer(port?: number): Promise<string> {
		port = port ?? Math.ceil(Math.random() * 2000) + 4000
		this.address = SocketModuleJava.startServer(port) as string
		return this.address
	}
	broadcastMessage(message: string): void {
		return SocketModuleJava.broadcastMessage(message)
	}
	stop(): Promise<boolean> {
		return SocketModuleJava.stopServer()
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
	sendMessage(message: string): void {
		return SocketModuleJava.sendMessage(message)
	}
	disconnect(): void {
		return SocketModuleJava.disconnectClient()
	}
}

export { SocketModuleServer, SocketModuleClient }
