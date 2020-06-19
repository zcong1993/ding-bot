import axios from 'axios'
import { createSign } from './sign'
import {
  Options,
  Resp,
  Msg,
  TextMsg,
  LinkMsg,
  MarkdownMsg,
  ActionCardMsg,
  FeedCardMsg,
} from './types'

const endpoint = 'https://oapi.dingtalk.com/robot/send'

export class DingBot {
  constructor(private readonly options: Options) {
    if (!this.options.endpoint) {
      this.options.endpoint = endpoint
    }
  }

  async sendTextMsg(msg: TextMsg) {
    return this.send(msg)
  }

  async sendLinkMsg(msg: LinkMsg) {
    return this.send(msg)
  }

  async sendMarkdownMsg(msg: MarkdownMsg) {
    return this.send(msg)
  }

  async sendActionCardMsg(msg: ActionCardMsg) {
    return this.send(msg)
  }

  async sendFeedCardMsg(msg: FeedCardMsg) {
    return this.send(msg)
  }

  async send(msg: Msg) {
    const data = await this.rawSend(msg)

    if (data.errcode !== 0) {
      throw new Error(data.errmsg)
    }
  }

  async rawSend(msg: Msg) {
    const { data } = await axios.request<Resp>({
      method: 'post',
      url: this.buildUrl(),
      data: msg,
    })

    return data
  }

  private buildUrl() {
    let url = `${endpoint}?access_token=${this.options.accessToken}`
    if (this.options.signKey) {
      const ts = new Date().getTime()
      const sign = createSign(this.options.signKey, ts)
      url += `&timestamp=${ts}&sign=${sign}`
    }
    return url
  }
}
