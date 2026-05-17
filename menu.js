(function () {
  const language = localStorage.getItem("language") || "en";
  const storedNick = localStorage.getItem("nick") || "";

  const translations = {
    en: {
      play: "Play",
      about: "About game",
      lang: "Another languages",
      nickPlaceholder: "Your nickname",
      logo: "PLATE-O-GUESSR",
      showLeaderboard: "Show leaderboard",
      partyModeBtn: "Party mode",
      partyLabel:"Available countries",
      partyModalTitle: "Party mode",
      partyCodeLabel: "Party code",
      copyPartyCodeBtn: "Copy code",
      sharePartyCodeBtn: "Share",
      partyCreateTitle: "Create party",
      partyDurationLabel: "Duration",
      partyDurationHint: "Minutes (10 - 129600)",
      partyCountriesLabel: "Available countries",
      createPartyBtn: "Create party",
      partyJoinTitle: "Join party",
      partyCodeInputLabel: "Party code",
      partyCodeInputPlaceholder: "e.g. A1B2C3",
      joinPartyBtn: "Join party",
      leavePartyBtn: "Leave current party",
      partyNoActive: "No active party.",
      partySummaryActivePrefix: "Active party",
      partySummaryCountriesPrefix: "countries",
      partySummaryRemainingPrefix: "remaining",
      partyStatusRefreshFailed: "Could not refresh party status.",
      partyStatusFetchFailed: "Could not fetch party status.",
      partyCopySuccess: "Party code and invite link copied.",
      partyCopyFailed: "Could not copy party code.",
      partyNoCode: "No active party code.",
      partyShareTitle: "Plate-o-Guessr party",
      partyShareTextPrefix: "Party code",
      partyShareSuccess: "Party shared.",
      partyShareCancelledCopy: "Sharing canceled. Party data copied.",
      partyShareFailed: "Could not share party.",
      partyShareCopySuccess: "Party data copied to clipboard.",
      partyCountriesRequired: "Select at least one country.",
      partyDurationInvalid: "Select valid party duration.",
      partyCreating: "Creating party...",
      partyCreateSuccessPrefix: "Party created",
      partyCreateSuccessSuffix: "You can share the code.",
      partyCreateFailed: "Could not create party.",
      partyJoining: "Joining party...",
      partyJoinSuccessPrefix: "Joined party",
      partyJoinFailed: "Could not join party.",
      partyLeaveSuccess: "Left the current party.",
      partyCodeLengthError: "Party code must have 6 characters.",
      partyNotFound: "Party with this code was not found.",
      partyExpired: "This party has already expired."
    },
    pl: {
      play: "Graj",
      about: "O grze",
      lang: "Inne jezyki",
      nickPlaceholder: "Twój nick",
      logo: "PLATE-O-GUESSR",
      showLeaderboard: "Pokaż tabelę wynikow",
      partyModeBtn: "Tryb imprezy",
      partyLabel:"Dostępne kraje",
      partyModalTitle: "Tryb imprezy",
      partyCodeLabel: "Kod imprezy",
      copyPartyCodeBtn: "Kopiuj kod",
      sharePartyCodeBtn: "Udostępnij",
      partyCreateTitle: "Stwórz imprezę",
      partyDurationLabel: "Czas trwania",
      partyDurationHint: "Minuty (10 - 129600)",
      partyCountriesLabel: "Dostępne kraje",
      createPartyBtn: "Stwórz imprezę",
      partyJoinTitle: "Dołącz do imprezy",
      partyCodeInputLabel: "Kod imprezy",
      partyCodeInputPlaceholder: "np. A1B2C3",
      joinPartyBtn: "Dołącz do imprezy",
      leavePartyBtn: "Opuść aktualną imprezę",
      partyNoActive: "Brak aktywnej imprezy.",
      partySummaryActivePrefix: "Aktywna impreza",
      partySummaryCountriesPrefix: "kraje",
      partySummaryRemainingPrefix: "pozostało",
      partyStatusRefreshFailed: "Nie można odświeżyć statusu imprezy.",
      partyStatusFetchFailed: "Nie można pobrać statusu imprezy.",
      partyCopySuccess: "Kod imprezy i link zaproszenia skopiowane.",
      partyCopyFailed: "Nie można skopiować kodu imprezy.",
      partyNoCode: "Brak aktywnego kodu imprezy.",
      partyShareTitle: "Impreza Plate-o-Guessr",
      partyShareTextPrefix: "Kod imprezy",
      partyShareSuccess: "Impreza udostępniona.",
      partyShareCancelledCopy: "Udostępnianie anulowane. Dane imprezy skopiowane.",
      partyShareFailed: "Nie można udostępnić imprezy.",
      partyShareCopySuccess: "Dane imprezy skopiowane do schowka.",
      partyCountriesRequired: "Wybierz przynajmniej jeden kraj.",
      partyDurationInvalid: "Wybierz prawidłowy czas trwania imprezy.",
      partyCreating: "Tworzenie imprezy...",
      partyCreateSuccessPrefix: "Impreza stworzona",
      partyCreateSuccessSuffix: "Możesz udostępnić kod.",
      partyCreateFailed: "Nie można stworzyć imprezy.",
      partyJoining: "Dołączanie do imprezy...",
      partyJoinSuccessPrefix: "Dołączono do imprezy",
      partyJoinFailed: "Nie można dołączyć do imprezy.",
      partyLeaveSuccess: "Opuściłeś aktualną imprezę.",
      partyCodeLengthError: "Kod imprezy musi mieć 6 znaków.",
      partyNotFound: "Nie znaleziono imprezy o tym kodzie.",
      partyExpired: "Ta impreza już wygasła."
    },
    ua: {
      play: "Грай",
      about: "Про гру",
      lang: "Інші мови",
      nickPlaceholder: "Ваше ім'я",
      logo: "PLATE-O-GUESSR",
      showLeaderboard: "Показати таблицю результатів",
      partyModeBtn: "Режим вечірки",
      partyLabel:"Доступні країни",
      partyModalTitle: "Режим вечірки",
      partyCodeLabel: "Код вечірки",
      copyPartyCodeBtn: "Скопіювати код",
      sharePartyCodeBtn: "Поділитися",
      partyCreateTitle: "Створити вечірку",
      partyDurationLabel: "Тривалість",
      partyDurationHint: "Хвилини (10 - 129600)",
      partyCountriesLabel: "Доступні країни",
      createPartyBtn: "Створити вечірку",
      partyJoinTitle: "Присоединиться к вечеринке",
      partyCodeInputLabel: "Код вечеринки",
      partyCodeInputPlaceholder: "напр. A1B2C3",
      joinPartyBtn: "Присоединиться к вечеринке",
      leavePartyBtn: "Покинуть текущую вечеринку",
      partyNoActive: "Нет активной вечеринки.",
      partySummaryActivePrefix: "Активная вечеринка",
      partySummaryCountriesPrefix: "страны",
      partySummaryRemainingPrefix: "осталось",
      partyStatusRefreshFailed: "Не удалось обновить статус вечеринки.",
      partyStatusFetchFailed: "Не удалось получить статус вечеринки.",
      partyCopySuccess: "Код вечеринки и ссылка приглашения скопированы.",
      partyCopyFailed: "Не удалось скопировать код вечеринки.",
      partyNoCode: "Нет активного кода вечеринки.",
      partyShareTitle: "Вечеринка Plate-o-Guessr",
      partyShareTextPrefix: "Код вечеринки",
      partyShareSuccess: "Вечеринка поделилась.",
      partyShareCancelledCopy: "Общий доступ отменен. Данные вечеринки скопированы.",
      partyShareFailed: "Не удалось поделиться вечеринкой.",
      partyShareCopySuccess: "Данные вечеринки скопированы в буфер обмена.",
      partyCountriesRequired: "Выберите хотя бы одну страну.",
      partyDurationInvalid: "Выберите допустимую продолжительность вечеринки.",
      partyCreating: "Создание вечеринки...",
      partyCreateSuccessPrefix: "Вечеринка создана",
      partyCreateSuccessSuffix: "Вы можете поделиться кодом.",
      partyCreateFailed: "Не удалось создать вечеринку.",
      partyJoining: "Присоединение к вечеринке...",
      partyJoinSuccessPrefix: "Присоединился к вечеринке",
      partyJoinFailed: "Не удалось присоединиться к вечеринке.",
      partyLeaveSuccess: "Покинул текущую вечеринку.",
      partyCodeLengthError: "Код вечеринки должен содержать 6 символов.",
      partyNotFound: "Вечеринка с таким кодом не найдена.",
      partyExpired: "Эта вечеринка уже истекла."

    },
    lt: {
      play: "Žaisk",
      about: "Apie žaidimą",
      lang: "Kitos kalbos",
      nickPlaceholder: "Tavo vardas",
      logo: "PLATE-O-GUESSR",
      showLeaderboard: "Rodyti lyderių lentą",
      partyModeBtn: "Vilkio režimas",
      partyLabel:"Galimos šalys",
      partyModalTitle: "Vilkio režimas",
      partyCodeLabel: "Vilkio kodas",
      copyPartyCodeBtn: "Kopijuoti kodą",
      sharePartyCodeBtn: "Dalintis",
      partyCreateTitle: "Sukurti vilkį",
      partyDurationLabel: "Trukmė",
      partyDurationHint: "Minutės (10 - 129600)",
      partyCountriesLabel: "Galimos šalys",
      createPartyBtn: "Sukurti vilkį",
      partyJoinTitle: "Prisijungti prie vilkio",
      partyCodeInputLabel: "Vilkio kodas",
      partyCodeInputPlaceholder: "pvz. A1B2C3",
      joinPartyBtn: "Prisijungti prie vilkio",
      leavePartyBtn: "Palikti esamą vilkį",
      partyNoActive: "Nėra aktyvaus vilkio.",
      partySummaryActivePrefix: "Aktyvus vilkis",
      partySummaryCountriesPrefix: "šalys",
      partySummaryRemainingPrefix: "liko",
      partyStatusRefreshFailed: "Nepavyko atnaujinti vilkio statuso.",
      partyStatusFetchFailed: "Nepavyko gauti vilkio statuso.",
      partyCopySuccess: "Vilkio kodas ir kvietimo nuoroda nukopijuoti.",
      partyCopyFailed: "Nepavyko kopijuoti vilkio kodo.",
      partyNoCode: "Nėra aktyvaus vilkio kodo.",
      partyShareTitle: "Plate-o-Guessr vilkio žaidimas",
      partyShareTextPrefix: "Vilkio kodas",
      partyShareSuccess: "Vilkis pasidalintas.",
      partyShareCancelledCopy: "Dalinimasis atšauktas. Vilkio duomenys nukopijuoti.",
      partyShareFailed: "Nepavyko pasidalinti vilkiu.",
      partyShareCopySuccess: "Vilkio duomenys nukopijuoti į iškarpinę.",
      partyCountriesRequired: "Pasirinkite bent vieną šalį.",
      partyDurationInvalid: "Pasirinkite tinkamą vilkio trukmę.",
      partyCreating: "Kuriamas vilkis...",
      partyCreateSuccessPrefix: "Vilkis sukurtas",
      partyCreateSuccessSuffix: "Galite pasidalinti kodu.",
      partyCreateFailed: "Nepavyko sukurti vilkio.",
      partyJoining: "Prisijungimas prie vilkio...",
      partyJoinSuccessPrefix: "Prisijungta prie vilkio",
      partyJoinFailed: "Nepavyko prisijungti prie vilkio.",
      partyLeaveSuccess: "Palikote esamą vilkį.",
      partyCodeLengthError: "Vilkio kodas turi būti 6 simbolių.",
      partyNotFound: "Vilkis su šiuo kodu nerastas.",
      partyExpired: "Šis vilkis jau pasibaigė."
    },
    de: {
      play:"spiel",
      about:"über das spiel",
      lang:"andere sprachen",
      nickPlaceholder:"dein spitzname",
      logo:"PLATE-O-GUESSR",
      showLeaderboard:"leaderboard anzeigen",
      partyModeBtn:"party modus",
      partyLabel:"verfügbare länder",
      partyModalTitle: "Party Modus",
      partyCodeLabel: "Party Code",
      copyPartyCodeBtn: "Code kopieren",
      sharePartyCodeBtn: "Teilen",
      partyCreateTitle: "Party erstellen",
      partyDurationLabel: "Dauer",
      partyDurationHint: "Minuten (10 - 129600)",
      partyCountriesLabel: "Verfügbare Länder",
      createPartyBtn: "Party erstellen",
      partyJoinTitle: "Party beitreten",
      partyCodeInputLabel: "Party Code",
      partyCodeInputPlaceholder: "z.B. A1B2C3",
      joinPartyBtn: "Party beitreten",
      leavePartyBtn: "Aktuelle Party verlassen",
      partyNoActive: "Keine aktive Party.",
      partySummaryActivePrefix: "Aktive Party",
      partySummaryCountriesPrefix: "Länder",
      partySummaryRemainingPrefix: "verbleibend",
      partyStatusRefreshFailed: "Konnte den Party-Status nicht aktualisieren.",
      partyStatusFetchFailed: "Konnte den Party-Status nicht abrufen.",
      partyCopySuccess: "Party-Code und Einladungslink kopiert.",
      partyCopyFailed: "Konnte den Party-Code nicht kopieren.",
      partyNoCode: "Kein aktiver Party-Code.",
      partyShareTitle: "Plate-o-Guessr Party",
      partyShareTextPrefix: "Party-Code",
      partyShareSuccess: "Party geteilt.",
      partyShareCancelledCopy: "Teilen abgebrochen. Party-Daten kopiert.",
      partyShareFailed: "Konnte die Party nicht teilen.",
      partyShareCopySuccess: "Party-Daten in die Zwischenablage kopiert.",
      partyCountriesRequired: "Wählen Sie mindestens ein Land aus.",
      partyDurationInvalid: "Wählen Sie eine gültige Partydauer aus.",
      partyCreating: "Party wird erstellt...",
      partyCreateSuccessPrefix: "Party erstellt",
      partyCreateSuccessSuffix: "Sie knnen den Party-Code teilen.",
      partyCreateFailed: "Konnte die Party nicht erstellen.",
      partyJoining: "Party beitreten...",
      partyJoinSuccessPrefix: "Beigetreten",
      partyJoinFailed: "Konnte die Party nicht beitreten.",
      partyLeaveSuccess: "Verlassen der aktuellen Party.",
      partyCodeLengthError: "Der Party-Code muss 6 Zeichen lang sein.",
      partyNotFound: "Party mit diesem Code wurde nicht gefunden.",
      partyExpired: "Diese Party ist abgelaufen."
    },
    es: {
      play:"jugar",
      about:"acerca del juego",
      lang:"otras lenguas",
      nickPlaceholder:"tu nickname",
      logo:"PLATE-O-GUESSR",
      showLeaderboard:"mostrar leaderboard",
      partyModeBtn:"modo de fiesta",
      partyLabel:"países disponibles",
      partyModalTitle: "Modo de fiesta",
      partyCodeLabel: "Código de la fiesta",
      copyPartyCodeBtn: "Copiar código",
      sharePartyCodeBtn: "Compartir",
      partyCreateTitle: "Crear fiesta",
      partyDurationLabel: "Duración",
      partyDurationHint: "Minutos (10 - 129600)",
      partyCountriesLabel: "Países disponibles",
      createPartyBtn: "Crear fiesta",
      partyJoinTitle: "Unirse a la fiesta",
      partyCodeInputLabel: "Código de la fiesta",
      partyCodeInputPlaceholder: "por ejemplo, A1B2C3",
      joinPartyBtn: "Unirse a la fiesta",
      leavePartyBtn: "Salir de la fiesta actual",
      partyNoActive: "No hay una fiesta activa.",
      partySummaryActivePrefix: "Fiesta activa",
      partySummaryCountriesPrefix: "Países",
      partySummaryRemainingPrefix: "restante",
      partyStatusRefreshFailed: "No se pudo actualizar el estado de la fiesta.",
      partyStatusFetchFailed: "No se pudo obtener el estado de la fiesta.",
      partyCopySuccess: "Código de la fiesta y enlace de invitación copiados.",
      partyCopyFailed: "No se pudo copiar el código de la fiesta.",
      partyNoCode: "No hay un código de fiesta activo.",
      partyShareTitle: "Plate-o-Guessr Fiesta",
      partyShareTextPrefix: "Código de la fiesta",
      partyShareSuccess: "Fiesta compartida.",
      partyShareCancelledCopy: "Compartir cancelado. Datos de la fiesta copiados.",
      partyShareFailed: "No se pudo compartir la fiesta.",
      partyShareCopySuccess: "Datos de la fiesta copiados en el portapapeles.",
      partyCountriesRequired: "Seleccione al menos un país.",
      partyDurationInvalid: "Seleccione una duración de fiesta válida.",
      partyCreating: "Creando fiesta...",
      partyCreateSuccessPrefix: "Fiesta creada",
      partyCreateSuccessSuffix: "Puede compartir el código.",
      partyCreateFailed: "No se pudo crear la fiesta.",
      partyJoining: "Unirse a la fiesta...",
      partyJoinSuccessPrefix: "Unido",
      partyJoinFailed: "No se pudo unirse a la fiesta.",
      partyLeaveSuccess: "Abandonando la fiesta actual.",
      partyCodeLengthError: "El código de la fiesta debe tener 6 caracteres.",
      partyNotFound: "Fiesta con este código no fue encontrada.",
      partyExpired: "Esta fiesta ha caducado."
    },
    fr: {
      play:"jouer",
      about:"à propos du jeu",
      lang:"autres langues",
      nickPlaceholder:"ton pseudo",
      logo:"PLATE-O-GUESSR",
      showLeaderboard:"afficher la classement",
      partyModeBtn:"mode de party",
      partyLabel:"pays disponibles",
      partyModalTitle: "Mode de party",
      partyCodeLabel: "Code de la party",
      copyPartyCodeBtn: "Copier le code",
      sharePartyCodeBtn: "Partager",
      partyCreateTitle: "Créer une party",
      partyDurationLabel: "Durée",
      partyDurationHint: "Minutes (10 - 129600)",
      partyCountriesLabel: "Pays disponibles",
      createPartyBtn: "Créer une party",
      partyJoinTitle: "Rejoindre une party",
      partyCodeInputLabel: "Code de la party",
      partyCodeInputPlaceholder: "par exemple, A1B2C3",
      joinPartyBtn: "Rejoindre la party",
      leavePartyBtn: "Quitter la party actuelle",
      partyNoActive: "Aucune party en cours.",
      partySummaryActivePrefix: "Party en cours",
      partySummaryCountriesPrefix: "pays",
      partySummaryRemainingPrefix: "restant",
      partyStatusRefreshFailed: "Impossible de mettre à jour le statut de la party.",
      partyStatusFetchFailed: "Impossible de obtenir le statut de la party.",
      partyCopySuccess: "Code de la party et lien d'invitation copiés.",
      partyCopyFailed: "Impossible de copier le code de la party.",
      partyNoCode: "Aucun code de party actif.",
      partyShareTitle: "Plate-o-Guessr Party",
      partyShareTextPrefix: "Code de la party",
      partyShareSuccess: "Party partagée.",
      partyShareCancelledCopy: "Partage annulé. Données de la party copiées.",
      partyShareFailed: "Impossible de partager la party.",
      partyShareCopySuccess: "Données de la party copiées dans le presse-papier.",
      partyCountriesRequired: "Choisissez au moins un pays.",
      partyDurationInvalid: "Choisissez une durée de party valide.",
      partyCreating: "Création de la party...",
      partyCreateSuccessPrefix: "Party crée",
      partyCreateSuccessSuffix: "Vous pouvez partager le code.",
      partyCreateFailed: "Impossible de créer la party.",
      partyJoining: "Rejoindre la party...",
      partyJoinSuccessPrefix: "Rejoint",
      partyJoinFailed: "Impossible de rejoindre la party.",
      partyLeaveSuccess: "Abandon de la party actuelle.",
      partyCodeLengthError: "Le code de la party doit avoir 6 caractères.",
      partyNotFound: "Party avec ce code n'a pas été trouvée.",
      partyExpired: "Cette party a expiré."
    },
    he: {
      play:"שחק",
      about:"אודות המשחק",
      lang:"שפות אחרות",
      nickPlaceholder:"שם פרטי",
      logo:"PLATE-O-GUESSR",
      showLeaderboard:"הצג טבלת תוצאות",
      partyModeBtn:"מצב גוף",
      partyLabel:"מדינות זמינות",
      partyModalTitle: "מצב גוף",
      partyCodeLabel: "קוד גוף",
      copyPartyCodeBtn: "העתק קוד",
      sharePartyCodeBtn: "שתף",
      partyCreateTitle: "צור גוף",
      partyDurationLabel: "משך",
      partyDurationHint: "דקות (10 - 129600)",
      partyCountriesLabel: "מדינות זמינות",
      createPartyBtn: "צור גוף",
      partyJoinTitle: "צור גוף",
      partyCodeInputLabel: "קוד גוף",
      partyCodeInputPlaceholder: "לדוגמה, A1B2C3",
      joinPartyBtn: "צור גוף",
      leavePartyBtn: "צור גוף",
      partyNoActive: "אין גוף פעיל.",
      partySummaryActivePrefix: "גוף פעיל",
      partySummaryCountriesPrefix: "מדינות",
      partySummaryRemainingPrefix: "נותר",
      partyStatusRefreshFailed: "לא ניתן לעדכן את הסטטוס של הגוף.",
      partyStatusFetchFailed: "לא ניתן לקבל את הסטטוס של הגוף.",
      partyCopySuccess: "קוד גוף וקישור לשתף הועתקו.",
      partyCopyFailed: "לא ניתן להעתק את הקוד של הגוף.",
      partyNoCode: "אין קוד גוף פעיל.",
      partyShareTitle: "גוף של Plate-o-Guessr",
      partyShareTextPrefix: "קוד של הגוף",
      partyShareSuccess: "הגוף שותף.",
      partyShareCancelledCopy: "השתף בוטל. הקוד של הגוף הועתק.",
      partyShareFailed: "לא ניתן לשתף את הגוף.",
      partyShareCopySuccess: "נתונים של הגוף הועתקו לבורדר.",
      partyCountriesRequired: "בחרו לפחות מדינה.",
      partyDurationInvalid: "בחרו גוף חוקי.",
      partyCreating: "צורת גוף...",
      partyCreateSuccessPrefix: "גוף נוצר",
      partyCreateSuccessSuffix: "אתה יכול לשתף את הקוד.",
      partyCreateFailed: "לא ניתן לצור את הגוף.",
      partyJoining: "צורת גוף...",
      partyJoinSuccessPrefix: "הגוף שותף",
      partyJoinFailed: "לא ניתן לצור את הגוף.",
      partyLeaving: "צורת גוף...",
      partyLeaveSuccess: "הגוף שותף",
      partyLeaveFailed: "לא ניתן לצור את הגוף.",
      partyCodeLengthError: "הקוד של הגוף חייב להיות 6 תווים.",
      partyNotFound: "לא נמצא גוף עם הקוד הזה.",
      partyExpired: "הגוף הזה כבר פג תוקף.",
    }
  };

  const translationDefaults = {
    partyModalTitle: "Party mode",
    partyCodeLabel: "Party code",
    copyPartyCodeBtn: "Copy code",
    sharePartyCodeBtn: "Share",
    partyCreateTitle: "Create party",
    partyDurationLabel: "Duration",
    partyDurationHint: "Minutes (10 - 129600)",
    partyCountriesLabel: "Available countries",
    createPartyBtn: "Create party",
    partyJoinTitle: "Join party",
    partyCodeInputLabel: "Party code",
    partyCodeInputPlaceholder: "e.g. A1B2C3",
    joinPartyBtn: "Join party",
    leavePartyBtn: "Leave current party",
    partyNoActive: "No active party.",
    partySummaryActivePrefix: "Active party",
    partySummaryCountriesPrefix: "countries",
    partySummaryRemainingPrefix: "remaining",
    partyStatusRefreshFailed: "Could not refresh party status.",
    partyStatusFetchFailed: "Could not fetch party status.",
    partyCopySuccess: "Party code and invite link copied.",
    partyCopyFailed: "Could not copy party code.",
    partyNoCode: "No active party code.",
    partyShareTitle: "Plate-o-Guessr party",
    partyShareTextPrefix: "Party code",
    partyShareSuccess: "Party shared.",
    partyShareCancelledCopy: "Sharing canceled. Party data copied.",
    partyShareFailed: "Could not share party.",
    partyShareCopySuccess: "Party data copied to clipboard.",
    partyCountriesRequired: "Select at least one country.",
    partyDurationInvalid: "Select valid party duration.",
    partyCreating: "Creating party...",
    partyCreateSuccessPrefix: "Party created",
    partyCreateSuccessSuffix: "You can share the code.",
    partyCreateFailed: "Could not create party.",
    partyJoining: "Joining party...",
    partyJoinSuccessPrefix: "Joined party",
    partyJoinFailed: "Could not join party.",
    partyLeaveSuccess: "Left the current party.",
    partyCodeLengthError: "Party code must have 6 characters.",
    partyNotFound: "Party with this code was not found.",
    partyExpired: "This party has already expired."
  };

  const partyErrorMessageMap = {
    "Kod imprezy musi mieć 6 znaków.": "partyCodeLengthError",
    "Nie znaleziono imprezy o podanym kodzie.": "partyNotFound",
    "Ta impreza już wygasła.": "partyExpired",
    "Nie udało się utworzyć imprezy. Spróbuj ponownie.": "partyCreateFailed"
  };

  Object.keys(translations).forEach(function (langKey) {
    translations[langKey] = Object.assign({}, translationDefaults, translations[langKey]);
  });

  function t(key, fallback) {
    const copy = translations[language] || translations.en;
    if (copy && Object.prototype.hasOwnProperty.call(copy, key)) {
      return copy[key];
    }
    if (translations.en && Object.prototype.hasOwnProperty.call(translations.en, key)) {
      return translations.en[key];
    }
    return fallback || "";
  }

  function saveNick(nickInput) {
    if (!nickInput) return;
    const cleanNick = nickInput.value.trim();
    if (cleanNick) {
      localStorage.setItem("nick", cleanNick);
    } else {
      localStorage.removeItem("nick");
    }
  }

  function applyMenuTranslations(elements) {
    if (elements.play) elements.play.innerText = t("play");
    if (elements.about) elements.about.innerText = t("about");
    if (elements.lang) elements.lang.innerText = t("lang");
    if (elements.nickInput) elements.nickInput.placeholder = t("nickPlaceholder");
    if (elements.logo) elements.logo.innerText = t("logo");
    if (elements.showLeaderboardBtn) elements.showLeaderboardBtn.innerText = t("showLeaderboard");
    if (elements.partyModeBtn) elements.partyModeBtn.innerText = t("partyModeBtn");
    if (elements.partyModalTitle) elements.partyModalTitle.innerText = t("partyModalTitle");
    if (elements.partyCodeLabel) elements.partyCodeLabel.innerText = t("partyCodeLabel");
    if (elements.copyPartyCodeBtn) elements.copyPartyCodeBtn.innerText = t("copyPartyCodeBtn");
    if (elements.sharePartyCodeBtn) elements.sharePartyCodeBtn.innerText = t("sharePartyCodeBtn");
    if (elements.partyCreateTitle) elements.partyCreateTitle.innerText = t("partyCreateTitle");
    if (elements.partyDurationLabel) elements.partyDurationLabel.innerText = t("partyDurationLabel");
    if (elements.partyDurationHint) elements.partyDurationHint.innerText = t("partyDurationHint");
    if (elements.partyCountriesLabel) elements.partyCountriesLabel.innerText = t("partyCountriesLabel");
    if (elements.createPartyBtn) elements.createPartyBtn.innerText = t("createPartyBtn");
    if (elements.partyJoinTitle) elements.partyJoinTitle.innerText = t("partyJoinTitle");
    if (elements.partyCodeInputLabel) elements.partyCodeInputLabel.innerText = t("partyCodeInputLabel");
    if (elements.partyCodeInput) elements.partyCodeInput.placeholder = t("partyCodeInputPlaceholder");
    if (elements.joinPartyBtn) elements.joinPartyBtn.innerText = t("joinPartyBtn");
    if (elements.leavePartyBtn) elements.leavePartyBtn.innerText = t("leavePartyBtn");
  }

  function setPartyFeedback(feedbackEl, message, isError) {
    if (!feedbackEl) return;
    feedbackEl.textContent = message || "";
    feedbackEl.style.color = isError ? "#a33434" : "#4f4f4f";
  }

  function getPartyErrorMessage(error, fallbackKey) {
    const rawMessage = error && error.message ? String(error.message) : "";
    const mappedKey = rawMessage ? partyErrorMessageMap[rawMessage] : null;
    if (mappedKey) {
      return t(mappedKey, rawMessage);
    }
    return rawMessage || t(fallbackKey);
  }

  function getSelectedCountries(container) {
    if (!container) return [];
    const checked = container.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checked).map(function (input) {
      return String(input.value || "").toUpperCase();
    });
  }

  function renderCountryOptions(container, options, selectedCodes) {
    if (!container) return;
    const selectedSet = new Set((selectedCodes || []).map(function (code) {
      return String(code || "").toUpperCase();
    }));

    container.innerHTML = "";
    options.forEach(function (option) {
      const code = String(option.code || "").toUpperCase();
      const label = option.label || code;
      const wrapper = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = code;
      checkbox.checked = selectedSet.size ? selectedSet.has(code) : true;

      const text = document.createElement("span");
      text.textContent = label;

      wrapper.appendChild(checkbox);
      wrapper.appendChild(text);
      container.appendChild(wrapper);
    });
  }

  function formatPartySummary(meta) {
    if (!meta) return t("partyNoActive");
    const countryList = Array.isArray(meta.countries) && meta.countries.length ? meta.countries.join(", ") : "-";
    const remaining =
      window.Leaderboard && typeof window.Leaderboard.formatRemainingTime === "function"
        ? window.Leaderboard.formatRemainingTime(meta.expiresAt)
        : "";
    return (
      t("partySummaryActivePrefix") +
      ": " +
      meta.code +
      " | " +
      t("partySummaryCountriesPrefix") +
      ": " +
      countryList +
      (remaining ? " | " + t("partySummaryRemainingPrefix") + ": " + remaining : "")
    );
  }

  function getPartyInviteLink(partyCode) {
    if (!partyCode) return "";
    try {
      const inviteUrl = new URL("game.html", window.location.href);
      inviteUrl.searchParams.set("party", partyCode);
      return inviteUrl.toString();
    } catch (error) {
      return "game.html?party=" + encodeURIComponent(partyCode);
    }
  }

  function setPartyCodeUi(elements, meta) {
    const hasParty = !!(meta && meta.code);
    const inviteLink = hasParty ? getPartyInviteLink(meta.code) : "";

    if (elements.partyCodeBox) {
      elements.partyCodeBox.hidden = !hasParty;
    }

    if (elements.partyCodeDisplay) {
      elements.partyCodeDisplay.textContent = hasParty ? meta.code : "-";
    }

    if (elements.partyInviteLink) {
      elements.partyInviteLink.value = inviteLink;
    }

    if (elements.copyPartyCodeBtn) {
      elements.copyPartyCodeBtn.disabled = !hasParty;
    }

    if (elements.sharePartyCodeBtn) {
      elements.sharePartyCodeBtn.disabled = !hasParty;
    }
  }

  async function copyTextToClipboard(text) {
    if (!text) return false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const tempInput = document.createElement("input");
    tempInput.value = text;
    tempInput.setAttribute("readonly", "readonly");
    tempInput.style.position = "absolute";
    tempInput.style.left = "-9999px";
    document.body.appendChild(tempInput);
    tempInput.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(tempInput);
    return copied;
  }

  function closePartyModal(elements) {
    if (elements.partyModal) {
      elements.partyModal.hidden = true;
    }
  }

  async function refreshPartyUi(elements) {
    if (!window.Leaderboard) return;
    const meta = await window.Leaderboard.getCurrentPartyMeta();
    const summary = formatPartySummary(meta);

    if (elements.partyStatus) {
      elements.partyStatus.hidden = !meta;
      elements.partyStatus.textContent = meta ? summary : "";
    }

    if (elements.partyActiveInfo) {
      elements.partyActiveInfo.textContent = summary;
    }

    if (elements.leavePartyBtn) {
      elements.leavePartyBtn.disabled = !meta;
    }

    if (elements.partyCodeInput && meta && meta.code) {
      elements.partyCodeInput.value = meta.code;
    }

    setPartyCodeUi(elements, meta);

    const countryOptions =
      typeof window.Leaderboard.getPartyCountryOptions === "function"
        ? window.Leaderboard.getPartyCountryOptions()
        : [{ code: "PL", label: "Poland (PL)" }, { code: "D", label: "Germany (D)" }];
    renderCountryOptions(
      elements.partyCountriesContainer,
      countryOptions,
      meta && Array.isArray(meta.countries) ? meta.countries : countryOptions.map(function (item) {
        return item.code;
      })
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    const elements = {
      play: document.getElementById("play"),
      about: document.getElementById("about"),
      lang: document.getElementById("lang"),
      nickInput: document.getElementById("nick"),
      logo: document.getElementById("logo"),
      showLeaderboardBtn: document.getElementById("showLeaderboardBtn"),
      partyModeBtn: document.getElementById("party_mode"),
      partyModalTitle: document.getElementById("partyModalTitle"),
      partyStatus: document.getElementById("partyStatus"),
      partyModal: document.getElementById("partyModal"),
      partyActiveInfo: document.getElementById("partyActiveInfo"),
      partyFeedback: document.getElementById("partyFeedback"),
      partyCodeLabel: document.getElementById("partyCodeLabel"),
      partyCreateTitle: document.getElementById("partyCreateTitle"),
      partyDurationLabel: document.getElementById("partyDurationLabel"),
      partyDurationHint: document.getElementById("partyDurationHint"),
      partyCountriesLabel: document.getElementById("partyCountriesLabel"),
      partyJoinTitle: document.getElementById("partyJoinTitle"),
      partyCodeInputLabel: document.getElementById("partyCodeInputLabel"),
      partyCountriesContainer: document.getElementById("partyCountriesContainer"),
      partyDuration: document.getElementById("partyDuration"),
      createPartyBtn: document.getElementById("createPartyBtn"),
      partyCodeInput: document.getElementById("partyCodeInput"),
      joinPartyBtn: document.getElementById("joinPartyBtn"),
      leavePartyBtn: document.getElementById("leavePartyBtn"),
      partyCodeBox: document.getElementById("partyCodeBox"),
      partyCodeDisplay: document.getElementById("partyCodeDisplay"),
      partyInviteLink: document.getElementById("partyInviteLink"),
      copyPartyCodeBtn: document.getElementById("copyPartyCodeBtn"),
      sharePartyCodeBtn: document.getElementById("sharePartyCodeBtn"),
      partyCloseBtns: document.querySelectorAll(".party-close-btn")
    };

    if (!elements.play || !elements.about || !elements.lang || !elements.nickInput || !elements.logo || !elements.showLeaderboardBtn) {
      console.error("One or more menu elements were not found.");
      return;
    }

    if (storedNick && !elements.nickInput.value) {
      elements.nickInput.value = storedNick;
    }

    applyMenuTranslations(elements);
    saveNick(elements.nickInput);

    elements.nickInput.addEventListener("input", function () {
      saveNick(elements.nickInput);
    });
    elements.play.addEventListener("click", function () {
      saveNick(elements.nickInput);
    });

    if (!window.Leaderboard || !elements.partyModeBtn || !elements.partyModal) {
      return;
    }

    refreshPartyUi(elements).catch(function (error) {
      console.warn("Nie udalo sie odswiezyc statusu imprezy:", error);
    });

    elements.partyModeBtn.addEventListener("click", function () {
      setPartyFeedback(elements.partyFeedback, "", false);
      elements.partyModal.hidden = false;
      refreshPartyUi(elements).catch(function (error) {
        setPartyFeedback(elements.partyFeedback, getPartyErrorMessage(error, "partyStatusFetchFailed"), true);
      });
    });

    if (elements.partyCloseBtns && elements.partyCloseBtns.length) {
      elements.partyCloseBtns.forEach(function (button) {
        button.addEventListener("click", function () {
          closePartyModal(elements);
        });
      });
    }

    elements.partyModal.addEventListener("click", function (event) {
      if (event.target === elements.partyModal) {
        closePartyModal(elements);
      }
    });

    if (elements.copyPartyCodeBtn) {
      elements.copyPartyCodeBtn.addEventListener("click", function () {
        const code = elements.partyCodeDisplay ? elements.partyCodeDisplay.textContent.trim() : "";
        const invite = elements.partyInviteLink ? elements.partyInviteLink.value.trim() : "";
        const payload = code && invite ? code + " | " + invite : code || invite;
        copyTextToClipboard(payload)
          .then(function (copied) {
            if (copied) {
              setPartyFeedback(elements.partyFeedback, t("partyCopySuccess"), false);
            } else {
              setPartyFeedback(elements.partyFeedback, t("partyCopyFailed"), true);
            }
          })
          .catch(function () {
            setPartyFeedback(elements.partyFeedback, t("partyCopyFailed"), true);
          });
      });
    }

    if (elements.sharePartyCodeBtn) {
      elements.sharePartyCodeBtn.addEventListener("click", function () {
        const code = elements.partyCodeDisplay ? elements.partyCodeDisplay.textContent.trim() : "";
        const invite = elements.partyInviteLink ? elements.partyInviteLink.value.trim() : "";
        if (!code) {
          setPartyFeedback(elements.partyFeedback, t("partyNoCode"), true);
          return;
        }

        const shareText = t("partyShareTextPrefix") + ": " + code;
        if (navigator.share) {
          navigator
            .share({
              title: t("partyShareTitle"),
              text: shareText,
              url: invite || undefined
            })
            .then(function () {
              setPartyFeedback(elements.partyFeedback, t("partyShareSuccess"), false);
            })
            .catch(function () {
              copyTextToClipboard((invite ? invite + " | " : "") + shareText)
                .then(function () {
                  setPartyFeedback(elements.partyFeedback, t("partyShareCancelledCopy"), false);
                })
                .catch(function () {
                  setPartyFeedback(elements.partyFeedback, t("partyShareFailed"), true);
                });
            });
          return;
        }

        copyTextToClipboard((invite ? invite + " | " : "") + shareText)
          .then(function (copied) {
            if (copied) {
              setPartyFeedback(elements.partyFeedback, t("partyShareCopySuccess"), false);
            } else {
              setPartyFeedback(elements.partyFeedback, t("partyShareFailed"), true);
            }
          })
          .catch(function () {
            setPartyFeedback(elements.partyFeedback, t("partyShareFailed"), true);
          });
      });
    }

    if (elements.createPartyBtn) {
      elements.createPartyBtn.addEventListener("click", function () {
        saveNick(elements.nickInput);

        const selectedCountries = getSelectedCountries(elements.partyCountriesContainer);
        if (!selectedCountries.length) {
          setPartyFeedback(elements.partyFeedback, t("partyCountriesRequired"), true);
          return;
        }

        const selectedDuration = Number(elements.partyDuration && elements.partyDuration.value);
        const limits =
          typeof window.Leaderboard.getPartyDurationLimits === "function"
            ? window.Leaderboard.getPartyDurationLimits()
            : { minMinutes: 10, maxMinutes: 129600 };

        if (
          !Number.isFinite(selectedDuration) ||
          selectedDuration < limits.minMinutes ||
          selectedDuration > limits.maxMinutes
        ) {
          setPartyFeedback(elements.partyFeedback, t("partyDurationInvalid"), true);
          return;
        }

        setPartyFeedback(elements.partyFeedback, t("partyCreating"), false);
        window.Leaderboard.createParty({
          countries: selectedCountries,
          durationMinutes: selectedDuration,
          nick: elements.nickInput.value
        })
          .then(function (partyMeta) {
            setPartyFeedback(
              elements.partyFeedback,
              t("partyCreateSuccessPrefix") + ": " + partyMeta.code + ". " + t("partyCreateSuccessSuffix"),
              false
            );
            return refreshPartyUi(elements);
          })
          .catch(function (error) {
            setPartyFeedback(elements.partyFeedback, getPartyErrorMessage(error, "partyCreateFailed"), true);
          });
      });
    }

    if (elements.joinPartyBtn) {
      elements.joinPartyBtn.addEventListener("click", function () {
        const code = String(elements.partyCodeInput && elements.partyCodeInput.value ? elements.partyCodeInput.value : "");
        setPartyFeedback(elements.partyFeedback, t("partyJoining"), false);

        window.Leaderboard.joinParty(code)
          .then(function (partyMeta) {
            setPartyFeedback(elements.partyFeedback, t("partyJoinSuccessPrefix") + ": " + partyMeta.code + ".", false);
            return refreshPartyUi(elements);
          })
          .catch(function (error) {
            setPartyFeedback(elements.partyFeedback, getPartyErrorMessage(error, "partyJoinFailed"), true);
          });
      });
    }

    if (elements.leavePartyBtn) {
      elements.leavePartyBtn.addEventListener("click", function () {
        window.Leaderboard.clearCurrentParty();
        if (elements.partyCodeInput) elements.partyCodeInput.value = "";
        setPartyFeedback(elements.partyFeedback, t("partyLeaveSuccess"), false);
        refreshPartyUi(elements).catch(function (error) {
          setPartyFeedback(elements.partyFeedback, getPartyErrorMessage(error, "partyStatusRefreshFailed"), true);
        });
      });
    }
  });
})();
