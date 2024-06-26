import React, {useEffect, useRef} from 'react';

function MessageBox(props) {
	const messagesEndRef = useRef(null);
	const { chatMessages, } = props;

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth', });
	}
	useEffect(() => {
		scrollToBottom()
	}, [chatMessages]);

	return (
		<div className={'h-[400px] overflow-auto px-[20px]'}>
			<ul className={'divide-y divide-gray-200'}>
				<li className={ 'py-3' }>
							<span className={ `block text-white font-bold` }>
								Micul bucatar:
							</span>
					<span className={ 'block' }>
								Bună! Cum iti pot fi de folos?
							</span>
				</li>
				{
					chatMessages.map((message, index) => {
						return (
							<li className={'py-3'} key={index}>
								<span className={ `block ${message.role === 'assistant' ? 'text-white' : 'text-blue-800'} font-bold` }>
									{
										message.role === 'assistant' ? 'Asistentul tău virtual:' : 'You:'
									}
								</span>
								<span className={ 'block' }>
									{
										message.content
									}
								</span>
							</li>
						)
					})
				}
			</ul>
			<div ref={ messagesEndRef } />
		</div>
	);
}

export default MessageBox;