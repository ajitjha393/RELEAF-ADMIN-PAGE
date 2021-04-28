import React, { useEffect, useState } from 'react'
import { Accordion, Panel } from 'baseui/accordion'
import { Table } from 'baseui/table-semantic'
import { Button } from 'baseui/button'
import { SIZE } from 'baseui/input'
import Spinner from '../UI/Spinner/Spinner'
import Modal from '../UI/Modal/Modal'

import { Tabs, Tab, FILL } from 'baseui/tabs-motion'

import axios from 'axios'
import './Experts.css'

const BASE_ENDPOINT = 'http://localhost:5000'

const Experts = () => {
	const [verifiedExperts, setVerifiedExperts] = useState([])
	const [unVerifiedExperts, setUnVerifiedExperts] = useState([])
	const [loading, setLoading] = useState(true)

	// Modal
	const [isOpen, setOpen] = React.useState(false)
	const [expertId, setExpertId] = useState(null)

	// Tabs

	const [activeKey, setActiveKey] = React.useState('0')

	useEffect(() => {
		const setAxiosResponse = (res) => {
			console.log(res.data)
			setLoading(false)
			const expertsList = res.data.data
			const [verifiedExp, unVerifiedExp] = getFilteredExperts(expertsList)
			setVerifiedExperts(verifiedExp)
			setUnVerifiedExperts(unVerifiedExp)
		}

		let endpoint = `${BASE_ENDPOINT}/api/expert/`
		axios
			.get(endpoint)
			.then(setAxiosResponse)
			.catch((err) => console.log(err))
	}, [])

	const applyHandler = (id) => {
		setExpertId(id)
		setOpen(true)
	}

	const verifyExpert = async (id) => {
		console.log(id)
		let res = await axios.post(`${BASE_ENDPOINT}/api/expert/verify`, {
			expertId: id,
		})

		console.log(res.data)
		setOpen(false)

		const setAxiosResponse = (res) => {
			console.log(res.data)
			setLoading(false)
			const expertsList = res.data.data
			const [verifiedExp, unVerifiedExp] = getFilteredExperts(expertsList)
			setVerifiedExperts(verifiedExp)
			setUnVerifiedExperts(unVerifiedExp)
		}

		setLoading(true)
		axios.get(`${BASE_ENDPOINT}/api/expert/`).then(setAxiosResponse)
	}

	let comp = <Spinner />

	function getExperts(experts, btn = null) {
		return (
			<>
				<Accordion onChange={({ expanded }) => console.log(expanded)}>
					{experts.map((exp) => (
						<Panel title={`Project ID #${exp._id}`} key={exp._id}>
							<Table
								columns={['Expert Info', 'Details']}
								data={[
									['First name', `${exp.firstName}`],
									['Last name', `${exp.lastName}`],
									['Specialization', `${exp.specialization}`],
									['Email', `${exp.email}`],
									['Address', `${exp.address}`],
									['City', `${exp.city}`],
									['Display Name', `${exp.displayName}`],
									[
										'Calendly Username',
										`${exp.calendlyUsername}`,
									],
									[
										'Profile Picture',
										`${BASE_ENDPOINT}/${exp.profilePicture}`,
									],
									[
										'Resume',
										`${BASE_ENDPOINT}/${exp.resume}`,
									],
								]}
							/>
							<Button
								style={{
									display: 'block',
									margin: '1rem auto',
									textAlign: 'center',
								}}
								onClick={() => applyHandler(exp._id)}
								size={SIZE.default}
							>
								{btn ? btn : 'Verify'}
							</Button>
						</Panel>
					))}
				</Accordion>

				<Modal
					isOpen={isOpen}
					setOpen={setOpen}
					btnLabel={btn ? 'CONFIRM' : 'ACCEPT'}
					expertId={expertId}
					verifyExpert={verifyExpert}
				/>
			</>
		)
	}

	if (!loading) {
		comp = (
			<Tabs
				activeKey={activeKey}
				onChange={({ activeKey }) => {
					setActiveKey(activeKey)
				}}
				fill={FILL.fixed}
				activateOnFocus
			>
				<Tab title="UnVerified Experts">
					{getExperts(unVerifiedExperts)}
				</Tab>
				<Tab title="Verified Experts">
					{getExperts(verifiedExperts, 'BLACKLIST')}
				</Tab>
			</Tabs>
		)
	}

	return comp
}

export default Experts

function getFilteredExperts(expertsList) {
	const verifiedExp = expertsList.filter((expert) => expert.verified)
	const unVerifiedExp = expertsList.filter((expert) => !expert.verified)
	return [verifiedExp, unVerifiedExp]
}
