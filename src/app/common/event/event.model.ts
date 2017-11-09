export class MainEvent {
    static MAIN_COMMAND_EVENT = 'main_command_event';

    action: string; // custom event type
    event: any; // html에서 발생하는 event ( ex: mouse event, keyboard event... )
    target: any; // event 발생 주체
    data: any; // 보내야 할 data
}
