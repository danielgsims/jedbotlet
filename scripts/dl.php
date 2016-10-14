<?php

$seasonEpisodeCount = [ 22, 22, 23, 23, 22, 22, 22 ];

for ($season = 1; $season <= 7; $season++) {
    for ($episode = 1; $episode <= $seasonEpisodeCount[$season - 1]; $episode++) {
        if ($episode < 10) {
            $episode = "0" . $episode;
        }
        $filename = "{$season}-{$episode}.txt";

        echo "Downloading: " . $filename . PHP_EOL;
        $url = "http://www.westwingtranscripts.com/wwscripts/{$filename}";
        $contents = file_get_contents($url);
        $path = __DIR__ . '/../files/' . $filename;

        file_put_contents($path, $contents);
    }
}
