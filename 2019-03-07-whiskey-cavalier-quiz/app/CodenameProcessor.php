<?php
namespace wc;


class CodenameProcessor
{
    /** @var string */
    private $male_en;

    /** @var string */
    private $male_ru;

    /** @var string */
    private $female_en;

    /** @var string */
    private $female_ru;

    private $male_codenames = [];

    private $female_codenames = [];

    private $neutral_codenames = [];

    /**
     * CodenameProcessor constructor.
     */
    public function __construct ()
    {
        $both = [
            [
                'codename'    => 'Текила Любовь',
                'description' => 'Ты дерзкий, резкий: три удара — и противник уже не может встать.',
            ],
            [
                'codename'    => 'Мистер Брют',
                'description' => 'Ты работаешь по классике, обдумывая каждый шаг. Отменный стратег, к тому же дамы от тебя просто в восторге.',
            ],
            [
                'codename'    => 'Ромовый всадник',
                'description' => 'Ты — лихой стрелок, способный обезоружить противника, не слезая со своего железного коня.',
            ],
            [
                'codename'    => 'Абсент мастер',
                'description' => 'Ты — король маскировки. Тебя никогда нет на месте, но ты всегда появляешься в самый нужный момент.',
            ],
            [
                'codename'    => 'Маршал Лимонад',
                'description' => 'Ты отличный напарник: легкий на подъем, энергичный и всегда трезво оценивающий ситуацию.',
            ],
            [
                'codename'    => 'Чайный Барон',
                'description' => 'Ты — командный игрок. Мастер переговоров. Можешь переманить любого на свою сторону.',
            ],
            [
                'codename'    => 'Игристый Прапор',
                'description' => 'Ты — отличный оратор, способный вдохновить всех своих коллег, но при этом предпочитающий оставаться в тылу.',
            ],
            [
                'codename'    => 'Кисель Гуру',
                'description' => 'Ты — уважаемый спецагент в отставке, всегда приходящий на помощь молодым и неопытным коллегам.',
            ],
            [
                'codename'    => 'Снайпер Молоко',
                'description' => 'Признаться честно, ты — не самый лучший стрелок. Но очень полезный человек для своего подразделения.',
            ],
        ];

        $onlyMale = [
            [
                'codename'    => 'Старый Бальзам',
                'description' => 'Твое главное оружие — опыт. Опыт и старинный семейный рецепт настойки.',
            ],
            [
                'codename'    => 'Рислинг Лейтенант',
                'description' => 'Мальчик молодой, все хотят потанцевать с тобой.',
            ],
        ];

        $this->neutral_codenames = $both;
        $this->female_codenames  = $both;
        $this->male_codenames    = array_merge($both, $onlyMale);
    }


    private function selectCodename(array $data): ?array
    {
        $rand = array_rand($data);
        return $data[$rand] ?? null;
    }

    public function generate(string $firstname, string $lastname): array
    {
        $firstname = mb_strtolower($firstname);

        if($this->isMaleName($firstname) && $codename = $this->selectCodename($this->male_codenames)) {
            return $codename;
        }
        if($this->isFemaleName($firstname) && $codename = $this->selectCodename($this->female_codenames)) {
            return $codename;
        }

        return $this->selectCodename($this->neutral_codenames);
    }
    
    private function isMaleName(string $firstname): bool 
    {
        if($this->male_ru === null) {
            $this->male_ru = require __DIR__ . '/names/male_ru.php';
        }
        
        if(in_array($firstname, $this->male_ru)) {
            return true;
        }

        if($this->male_en === null) {
            $this->male_en = require __DIR__ . '/names/male_en.php';
        }

        if(in_array($firstname, $this->male_en)) {
            return true;
        }
        
        return false;
    }

    private function isFemaleName(string $firstname): bool 
    {
        if($this->female_ru === null) {
            $this->female_ru = require __DIR__ . '/names/female_ru.php';
        }

        if(in_array($firstname, $this->female_ru)) {
            return true;
        }

        if($this->female_en === null) {
            $this->female_en = require __DIR__ . '/names/female_en.php';
        }

        if(in_array($firstname, $this->female_en)) {
            return true;
        }

        return false;
    }
}