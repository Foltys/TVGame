import { EmitterSubscription, NativeEventEmitter, NativeModule, NativeModules } from 'react-native'
import { Player } from '../components/PlayerCard'

const { SocketModule: SocketModuleJava } = NativeModules
type ServerEvents = 'ServerOnClose' | 'ServerOnMessage' | 'ServerOnError' | 'ServerOnStart' | 'ServerOnOpen'
type ClientEvents = 'ClientOnOpen' | 'ClientOnMessage' | 'ClientOnClose' | 'ClientOnError'

type GameAdapters = 'QuizAdapter'
export interface JsonMessage {
	setName?: string
	input?: string | number
	adapter?: GameAdapters
}

let socketModuleServerInstance: SocketModuleServer | null = null
class SocketModuleServer extends NativeEventEmitter {
	address: string | null = null
	connectedClients: Map<Player[0], Player[1]> = new Map()

	private constructor() {
		super()
		this.addListener('ServerOnClose', (clientAddress) => {
			this.connectedClients.delete(clientAddress)
		})
	}

	static getInstance(): SocketModuleServer {
		if (!socketModuleServerInstance) {
			socketModuleServerInstance = new SocketModuleServer()
		}
		return socketModuleServerInstance
	}
	addListener(type: ServerEvents, listener: (data: any) => void, context?: any): EmitterSubscription {
		return super.addListener(type, listener, context)
	}
	addJsonListener(listener: (id: string, data: JsonMessage) => void, context?: any): EmitterSubscription {
		return super.addListener(
			'ServerOnMessage',
			({ id, message }: { id: string; message: string }) => {
				try {
					listener(id, JSON.parse(message))
				} catch {}
			},
			context,
		)
	}
	startServer(port?: number, callback?: () => void) {
		port = port ?? Math.ceil(Math.random() * 2000) + 4000
		SocketModuleJava.startServer(port)
		const sub = this.addListener('ServerOnStart', (addr: string) => {
			this.address = `${addr}:${port}`
			callback && callback()
			sub.remove()
		})
	}
	broadcastMessage(message: string | JsonMessage): void {
		if (typeof message != 'string') {
			message = JSON.stringify(message)
		}
		return SocketModuleJava.broadcastMessage(message)
	}
	stop() {
		SocketModuleJava.stopServer()
		this.destroy()
	}
	destroy() {
		this.address = null
		this.connectedClients.clear()
	}
}

let socketModuleClient: SocketModuleClient | null = null

class SocketModuleClient extends NativeEventEmitter {
	name: string = ''
	connected: boolean = false
	constructor() {
		super()
		this.addListener('ClientOnClose', () => {
			this.destroy()
		})
	}

	static getInstance(): SocketModuleClient {
		if (!socketModuleClient) {
			socketModuleClient = new SocketModuleClient()
		}
		return socketModuleClient
	}
	addListener(type: ClientEvents, listener: (data: any) => void, context?: any): EmitterSubscription {
		return super.addListener(type, listener, context)
	}
	addJsonListener(listener: (data: JsonMessage) => void, context?: any): EmitterSubscription {
		return super.addListener(
			'ClientOnMessage',
			(data: any) => {
				try {
					listener(JSON.parse(data))
				} catch {}
			},
			context,
		)
	}
	attachClient(uri: string, callback?: () => void) {
		SocketModuleJava.attachClient(uri)
		const onOpenListener = this.addListener('ClientOnOpen', (statusMessage) => {
			console.log({ statusMessage })
			callback && callback()
			this.connected = true
			onOpenListener.remove()
		})
	}
	sendMessage(message: string): void {
		return SocketModuleJava.sendMessage(message)
	}
	sendJson(json: JsonMessage) {
		return SocketModuleJava.sendMessage(JSON.stringify(json))
	}
	disconnect(): void {
		this.connected && SocketModuleJava.disconnectClient()
	}
	destroy() {
		this.connected = false
		this.name = ''
	}
}

export { SocketModuleServer, SocketModuleClient }
