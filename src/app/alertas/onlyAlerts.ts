import { ELocalNotificationTriggerUnit, LocalNotifications } from "@ionic-native/local-notifications/ngx";

export class onlyAlerts {
    public static scheduleNotification(mensaje: any, localNotifications: LocalNotifications) {
        localNotifications.schedule({
            id: 1,
            title: 'Attention',
            text: mensaje,
            data: { mydata: 'My hidden message this is' },
            trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
            foreground: true // Show the notification while app is open
        });

    }

    public static mostrarPrecioRecurrentemente(titulo: string, mensaje: string, precioActivo: any, localNotifications: LocalNotifications) {
        localNotifications.schedule({
            id: Math.floor(Math.random() * 100),
            title: titulo,
            text: precioActivo + " " + mensaje,
            trigger: { every: ELocalNotificationTriggerUnit.MINUTE },
            foreground: true // Show the notification while app is open
        });
    }

    public static mostrarPrecioInmediatoTest(titulo: string, mensaje: string, localNotifications: LocalNotifications) {
        localNotifications.schedule({
            id: Math.floor(Math.random() * 100),
            title: titulo,
            text: mensaje,
            led: 'FF0000',
            priority: 2,
            lockscreen: true,
            foreground: true // Show the notification while app is open
        });
    }

    public static repeatingDaily(localNotifications: LocalNotifications) {
        localNotifications.schedule({
            id: 42,
            title: 'Good Morning',
            text: 'Code something epic today!',
            trigger: { every: { hour: 9, minute: 30 } }
        });
    }



}