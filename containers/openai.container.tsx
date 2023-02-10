import { useState } from "react";
import { Button } from "../components/button.component";
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import dayjs from 'dayjs';

export const OpenaiContainer = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { addToast } = useToasts();
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const send = async () => {
        if (!question) {
            return;
        }
        try {
            messages.unshift({ msg: question, time: Date.now() });
            setMessages(messages);
            setLoading(true);
            setQuestion('');
            const res = await axios.post<any>('/api/openai', { text: question });
            messages.unshift({ msg: res.data.text, time: Date.now() });
            setMessages(messages);
            setLoading(false);
        } catch (e) {
            addToast(e?.response?.data?.message ?? e.message, {
                appearance: 'error',
                autoDismiss: true
            });
            setLoading(false);
        }
    }

    const onKeyDown = (e) => {
        if (e.keyCode !== 13) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        send();
    }
    return <div
        className="mx-8 md:mx-16">
        <div className="px-4 py-4 bg-white rounded-b-lg dark:bg-gray-800">
            <label htmlFor="editor" className="sr-only">Publish post</label>
            <textarea
                onKeyDown={onKeyDown}
                id="editor"
                value={question}
                onInput={e => setQuestion((e.target as any).value)}
                placeholder="Talk with Open AI"
                rows={8}
                className="
                    block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800
                    focus:ring-0 dark:text-white dark:placeholder-gray-400 outline-none
                "
                required>
            </textarea>
        </div>
        <div className="flex justify-end">
            <Button className="py-2 mt-4" onClick={send} loading={loading}>
                {loading ? 'Sending' : 'Send'}
            </Button>
        </div>


        <ul className="
            text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg
            dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full
        ">
            {messages.map(item => <li
                key={item.time}
                className="w-full px-6 py-8 border-b border-gray-200 border-solid rounded-t-lg dark:border-gray-600 ">
                <div className="dark:text-footer-text text-gray-400">
                    {dayjs(item.time).format('YYYY-MM-DD hh:mm:ss')}
                </div>
                <div className="text-2xl mt-2 whitespace-pre-line">{item.msg}</div>
            </li>)}
        </ul>
    </div>
}
