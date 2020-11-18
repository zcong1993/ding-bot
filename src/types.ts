export interface Options {
  accessToken: string
  signKey?: string
  endpoint?: string
}

export interface Resp {
  errcode: number
  errmsg: string
}

export interface At {
  atMobiles?: string[]
  isAtAll?: boolean
}

interface BaseMsg {
  msgtype: string
  at?: At
}

type BaseMsgWithoutAt = Omit<BaseMsg, 'at'>

export interface TextMsg extends BaseMsg {
  msgtype: 'text'
  text: {
    content: string
  }
}

export interface Link {
  text: string
  title: string
  picUrl: string
  messageUrl: string
}

export interface LinkMsg extends BaseMsgWithoutAt {
  msgtype: 'link'
  link: Link
}

export interface Markdown {
  title: string
  text: string
}

export interface MarkdownMsg extends BaseMsg {
  msgtype: 'markdown'
  markdown: Markdown
}

export interface FullActionCard {
  title: string
  text: string
  btnOrientation?: '0' | '1'
  singleTitle: string
  singleURL: string
}

export interface Btn {
  title: string
  actionURL: string
}

export interface IndependentActionCard {
  title: string
  text: string
  btnOrientation?: '0' | '1'
  btns: Btn[]
}

export interface ActionCardMsg extends BaseMsgWithoutAt {
  msgtype: 'actionCard'
  actionCard: FullActionCard | IndependentActionCard
}

export interface FeedCard {
  links: Link[]
}

export interface Link {
  title: string
  messageURL: string
  picURL: string
}

export interface FeedCardMsg extends BaseMsgWithoutAt {
  msgtype: 'feedCard'
  actionCard: FeedCard
}

export type Msg = TextMsg | LinkMsg | MarkdownMsg | ActionCardMsg | FeedCardMsg

export type OmitMsgType<T extends Msg> = Omit<T, 'msgtype'>
