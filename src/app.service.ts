import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './DTO/ResponseDTO';
import { DataDTO } from './DTO/DataDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './Models/Event';
import { Repository } from 'typeorm';
import { ResonseEventDTO } from './DTO/ResponseEventDTO';


@Injectable()
export class AppService {

    constructor(
        @InjectRepository(Event) private eventRepo: Repository<Event>
    ) { }

    async eventsResponser(data: any) {
        const responseDTO = new ResponseDTO()
        let status = 200

        try {
            const resonseDataDTO = await this.eventsHandler(data)
            responseDTO.data = resonseDataDTO
        }
        catch (e) {
            if (e == 'sessions not found' || e == 'session expired') {
                status = 403//перезапуск клиента
            } else if (e == 'too many requests') {
                status = 429//повторить запрос позже
            } else if (e == 'parsing data error') {
                status = 400 //сервер не знает что делать
            } else {
                status = 400
            }
            console.log("Ошибка " + e)
        }
        responseDTO.status = status

        return responseDTO
    }

    async eventsHandler(data: any): Promise<ResonseEventDTO> {
        let dataDTO
        try {
            dataDTO = new DataDTO(data.accountId, data.sessionId, data.events)
        } catch (e) {
            throw "parsing data error"
        }

        return this.eventsLogic(dataDTO)
    }


    async eventsLogic(dataDTO: DataDTO): Promise<ResonseEventDTO> {
        const accountId = dataDTO.accountId

        const events = this.parseEvents(dataDTO.events)

        for (let l = 0; l < events.length; l++) {
            await this.saveEvent(accountId, events[l])
        }
        return new ResonseEventDTO()
    }

    //----------------------------------------------------------

    parseEvents(objects: object): Array<string> {
        const dataObjects = new Array<string>
        const arr = Object.values(objects)
        for (let l = 0; l < arr.length; l++) {
            if (arr[l] == '') { continue }
            dataObjects.push(arr[l])
        }
        return dataObjects
    }


    async saveEvent(accountId: string, event: string) {
        await this.eventRepo.save(
            await this.eventRepo.create(
                {
                    accountId: accountId,
                    eventName: event
                }
            )
        )
    }

}


