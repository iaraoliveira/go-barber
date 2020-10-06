import IMailProvider from '../models/IMailProvider';

interface IMessage {
    to: string;
    body: string;
}

export default class FakeMailProvider implements IMailProvider {
    private messsages: IMessage[] = [];

    public async sendMail(to:string, body:string): Promise<void> {
        this.messsages.push({
            to, 
            body
        });
    }
}