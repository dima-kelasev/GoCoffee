import { Modal, notification } from 'antd';
import { useRecoilState } from 'recoil';
import { modalState } from '../../store/modal-state';
import {
  CustomBtn,
  MenuDescription,
  MenuItem,
  MenuItemsContainer,
  MenuTitle,
  ModalTittle,
} from './menu-modal.styeld';
import { Typography } from 'antd';
import { TMenu } from '../../common/types/shop-item.type';
import { ORDER_MODAL } from '../../common/conts/modal-key.const';

const { Title, Text } = Typography;

export const MenuModal = () => {
  const [modalProps, setModalProps] = useRecoilState(modalState);
  const { isOpen, cafeInfo } = modalProps;
  const [api, contextHolder] = notification.useNotification();

  const handleCancel = () => {
    setModalProps({ isOpen: false });
  };

  const handleClick = (product: TMenu) => {
    api.success({
      message: 'Заказ принят',
      description: `Ваш заказ: ${product.nameProduct}, ${product.size}мл, принят!`,
      showProgress: true,
      placement: 'bottom',
    });
    api.info({
      message: 'Твой заказ в консоли!',
      showProgress: true,
      placement: 'topLeft',
    });

    const { imageLink, id, ...rest } = product;
    const order = {
      ...rest,
      cafeName: cafeInfo?.name,
      cafeId: cafeInfo?.id,
      productId: id,
    };

    console.log('order', order);
    handleCancel();
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        onCancel={handleCancel}
        footer={<></>}
        width={700}
        key={ORDER_MODAL}
      >
        <ModalTittle>
          <Title level={1} style={{ margin: 0 }}>
            {cafeInfo?.name}
          </Title>
          <Text type="secondary">{`Адрес: ${cafeInfo?.address}`}</Text>
        </ModalTittle>

        <MenuTitle>
          <Title level={3} style={{ margin: 0 }}>
            Меню:
          </Title>
        </MenuTitle>

        <MenuItemsContainer>
          {cafeInfo?.menu.map((item) => (
            <MenuItem key={item.nameProduct}>
              <img
                src={item.imageLink}
                alt={item.nameProduct}
                width={100}
                height={100}
              />
              <MenuDescription>
                <Title level={5}>{item.nameProduct}</Title>
                <Text type="secondary">{`${item.size} мл`}</Text>
              </MenuDescription>
              <CustomBtn
                type="primary"
                onClick={() => handleClick(item)}
              >{`${item.price}₽`}</CustomBtn>
            </MenuItem>
          ))}
        </MenuItemsContainer>
      </Modal>
    </>
  );
};
