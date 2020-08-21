export default interface IAddUserToGroupRequestDTO {
  id_user: string;
  id_group: string;
  admin?: boolean;
}
