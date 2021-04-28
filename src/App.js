import React, { useState } from 'react'
import Experts from './components/Experts/Experts'
import './App.css'

import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
const engine = new Styletron()

function App() {
	return (
		<StyletronProvider value={engine}>
			<BaseProvider theme={LightTheme}>
				<div className="App">
					<header>
						<h1>RELEAF ADMIN PAGE</h1>
					</header>

					<main>
						<Experts />
					</main>
				</div>
			</BaseProvider>
		</StyletronProvider>
	)
}

export default App
