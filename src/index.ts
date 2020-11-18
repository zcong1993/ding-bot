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
  OmitMsgType,
} from './types'

const endpoint = 'https://oapi.dingtalk.com/robot/send'

export class DingBot {
  constructor(private readonly options: Options) {
    if (!this.options.endpoint) {
      this.options.endpoint = endpoint
    }
  }

  async sendTextMsg(msg: OmitMsgType<TextMsg>) {
    return this.send({
      msgtype: 'text',
      ...msg,
    })
  }

  async sendLinkMsg(msg: OmitMsgType<LinkMsg>) {
    return this.send({
      msgtype: 'link',
      ...msg,
    })
  }

  async sendMarkdownMsg(msg: OmitMsgType<MarkdownMsg>) {
    return this.send({
      msgtype: 'markdown',
      ...msg,
    })
  }

  async sendActionCardMsg(msg: OmitMsgType<ActionCardMsg>) {
    return this.send({
      msgtype: 'actionCard',
      ...msg,
    })
  }

  async sendFeedCardMsg(msg: OmitMsgType<FeedCardMsg>) {
    return this.send({
      msgtype: 'feedCard',
      ...msg,
    })
  }

  async send(msg: Msg) {
    const data = await this.rawSend(msg)

    if (data.errcode !== 0) {
      throw new Error(data.errmsg)
    }
  }

  async rawSend(msg: Msg | string) {
    const { data } = await axios.request<Resp>({
      method: 'post',
      url: this.buildUrl(),
      data: msg,
      headers: {
        'content-type': 'application/json',
      },
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
