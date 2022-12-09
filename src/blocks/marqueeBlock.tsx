import Block from './Block'
import { BlockModel } from './types'
import BlockFactory from './BlockFactory';
import './BlockStyles.css'
import { Button, Form, Input, message, Space } from "antd";

type MarqueeProps = React.HTMLAttributes<HTMLElement>;

function TypescriptMarquee(props: MarqueeProps) {
  // @ts-ignore
  return <marquee scrollamount="10" {...props} />;
}

export default class marqueeBlock extends Block {
  render() {
    if (Object.keys(this.model.data).length === 0) {
      return BlockFactory.renderEmptyState(this.model, this.onEditCallback!)
    }

    let text = this.model.data["text"]
    if (text === undefined) {
      return this.renderErrorState()
    }

    return (<TypescriptMarquee style={{ fontSize: '64px' }}>
      {text}
    </TypescriptMarquee>);
  }

  renderEditModal(done: (data: BlockModel) => void) {
    const onFinish = async (values: any) => {
      let text = values['text']
      this.model.data['text'] = text
      done(this.model)
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: false,
          text: this.model.data['text']
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Text"
          name="text"
          rules={[
            {
              required: true,
              message: 'Wait, you didn\'t add a url here',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="save-modal-button">
            Save
          </Button>
        </Form.Item>
      </Form>
    )
  }

  renderErrorState() {
    return (
      <h1>Error!</h1>
    )
  }
}