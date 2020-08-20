export default interface ICreateGroupDTO {
  name: string;
  user_admin: string;
  date_raffle: Date;
  date_party: Date;
  hour_party: Date;
  locale_party: string;
  value_min: number;
}
