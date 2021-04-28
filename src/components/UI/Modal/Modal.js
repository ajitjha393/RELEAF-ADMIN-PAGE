import * as React from 'react'
import { Button } from 'baseui/button'
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalButton,
	FocusOnce,
} from 'baseui/modal'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'

export default function ModalComponent({
	isOpen,
	setOpen,
	btnLabel,
	expertId,
	verifyExpert,
}) {
	return (
		<React.Fragment>
			{/* <Button onClick={() => setOpen(s => !s)}>Open Modal</Button> */}
			<Modal onClose={() => setOpen(false)} isOpen={isOpen}>
				<FocusOnce>
					<div
						style={{
							textAlign: 'center',
							margin: '2rem auto',
							fontWeight: 'bold',
							fontSize: '1.2rem',
							textDecoration: 'underline',
						}}
					>
						<ModalHeader>Verify</ModalHeader>
					</div>
				</FocusOnce>
				<ModalBody>
					<div
						style={{
							margin: 'auto',
							textAlign: 'center',
							fontSize: '1rem',
							margin: '1rem 0',
						}}
					>
						Please Make sure You have verified All the details
						provided by the experts before continuing
					</div>
				</ModalBody>
				<ModalFooter>
					<ModalButton kind="tertiary" onClick={() => setOpen(false)}>
						CANCEL
					</ModalButton>
					<ModalButton
						onClick={() => verifyExpert(expertId)}
						autoFocus
					>
						{btnLabel}
					</ModalButton>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	)
}
