<!DOCTYPE html>
<html lang="el">
    <head>
        <title>Mapa</title>
        <meta charset="utf-8">

        <link rel="stylesheet" href="normalize.css">

        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""/>
        
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script>
        
        <link rel="stylesheet" href="styles.css"/>

    </head>

    <body><!--
        <header>
            <nav>
                Help me!!!!
            </nav>
            <nav>
                Rescuer
            </nav>
            <nav>
                Admin
            </nav>
        </header>
    -->
        <?php
        include('header.html');
        ?>
        <a href='test2.php'>go next page</a>
        <main>
            <h2>
                The mapa
            </h2>

            <section>
                <div id="map"></div>
                <script src="map.js"></script>
            </section>
            <section>
                <br/><br/>
                <article>
                    <h3>
                        Instructions:
                    </h3>
                    <p>
                        If you want to get help say AAAA!!!
                    </p>
                </article>

                <article>
                    <figure>
                        <img src="test.png"/>
                        <figcaption>

                        </figcaption>
                    </figure>
                </article>

                <details>
                    <summary>
                        Food
                    </summary>
                    <h2>Gimme Foood!</h2>
                </details><br/>
                <details>
                    <summary>
                        Water
                    </summary>
                    <h2>Gimme Waterrr!</h2>
                </details>
                <aside>
                    <h6>
                        something not important aside
                    </h6>
                </aside>
            </section>
        </main>

        <br/>
        <footer>
            Report a bug
        </footer>

    </body>
</html>