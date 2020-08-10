const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //inserir dados
    proffyValue = {
        name: 'Nicolas Theodoro',
        avatar: 'https://avatars2.githubusercontent.com/u/44208206?s=460&u=2d70a9cae261bfece3420aa4af4beda40ffe63b2&v=4',
        whatsapp: '21990178608',
        bio: 'Apaixonado por tecnologia desde sempre. Hoje um estudante formada em Análise e Desenvolvimento de Sistemas se especializando/estudando as melhores tecnologias front-end (#html #css #javascript).'
    }

    classValue = {
        subject: 'Ciências',
        cost: '200',
        // o proffy_id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados após cadastrar a aula
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 4,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar dados inseridos
    
    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //consultar as classes de um determinado professor e trazer juntos os dados
    const selectClassesAndProffys = await db.all (`
        SELECT classes.*, proffys. * 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    //o horário que a pessao trabalha, por exemplo, é das 8h - 18h
    // o horario do time_from (8h) precisa ser antes ou igual ao horário solicitado
    //o time_to  precisa ser acima 

    const selectClassesSchedules = await db.all (`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "4"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300";
    `)
    //console.log(selectClassesSchedules)
})