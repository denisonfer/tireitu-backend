import { injectable, inject } from 'tsyringe';
import { resolve } from 'path';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProviders/models/IMailProvider';
import IInvitesRepository from '../repositories/IInvitesRepository';
import Invite from '../infra/typeorm/entities/Invite';
import IGroupsRepository from '../repositories/IGroupsRepository';

interface IRequestDTO {
  id_group: string;
  name_invited: string;
  email_invited: string;
}

@injectable()
export default class CreateInviteService {
  constructor(
    @inject('InvitesRepository')
    private invitesRepository: IInvitesRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({
    id_group,
    name_invited,
    email_invited,
  }: IRequestDTO): Promise<Invite> {
    const group = await this.groupsRepository.findById(id_group);

    if (!group) {
      throw new AppError('Grupo inexistente', 401);
    }

    const invite_key = String(Math.floor(100000 + Math.random() * 900000));

    const invite = await this.invitesRepository.create({
      id_group: group.id,
      invite_key,
    });

    await this.invitesRepository.save(invite);

    // Send E-mail to invited user
    const templateInvite = resolve(__dirname, '..', 'views', 'invite.hbs');

    const datesInPtBr = {
      date_raffled: format(group.date_raffle, "'Dia' dd 'de' MMM 'de' yyyy", {
        locale: ptBr,
      }),
      date_party: format(group.date_party, "'Dia' dd 'de' MMM 'de' yyyy", {
        locale: ptBr,
      }),
      hour_party: format(group.hour_party, "'às' HH:mm", {
        locale: ptBr,
      }),
    };

    await this.mailProvider.sendMail({
      to: {
        name: name_invited,
        email: email_invited,
      },
      subject: '[TireiTu] Convite para grupo de amigo secreto',
      templateData: {
        file: templateInvite,
        variables: {
          name_invited,
          group_name: group.name,
          date_raffled: `${datesInPtBr.date_raffled}`,
          date_party: `${datesInPtBr.date_party}`,
          hour_party: `${datesInPtBr.hour_party}`,
          locale_party: group.locale_party,
          value_min: group.value_min,
          invite_key,
        },
      },
    });

    return invite;
  }
}
