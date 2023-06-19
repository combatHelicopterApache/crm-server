const inviteTemplate = (
  link,
  name,
  username
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        style="
            width: 100%;
            font-family: lato, 'helvetica neue', helvetica, arial, sans-serif !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            padding: 0;
            margin: 0;
        "
    >
        <head>
            <meta charset="UTF-8" />
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <meta name="x-apple-disable-message-reformatting" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta content="telephone=no" name="format-detection" />
            <title></title>
            <!--[if (mso 16)]>
                <style type="text/css">
                    a {
                        text-decoration: none;
                    }
                </style>
            <![endif]-->
            <!--[if gte mso 9
                ]><style>
                    sup {
                        font-size: 100% !important;
                    }
                </style><!
            [endif]-->
            <!--[if gte mso 9]>
                <xml>
                    <o:OfficeDocumentSettings>
                        <o:AllowPNG></o:AllowPNG>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
            <![endif]-->
            <!--[if !mso]><!-- -->
            <link
                href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i"
                rel="stylesheet"
            />
            <!--<![endif]-->
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
                .ExternalClass {
                    width: 100%;
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                    line-height: 100%;
                }
                .es-button {
                    mso-style-priority: 100 !important;
                    text-decoration: none !important;
                }
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
                .es-desk-hidden {
                    display: none;
                    float: left;
                    overflow: hidden;
                    width: 0;
                    max-height: 0;
                    line-height: 0;
                    mso-hide: all;
                }
                @media only screen and (max-width: 600px) {
                    p,
                    ul li,
                    ol li,
                    a {
                        font-size: 16px !important;
                        line-height: 150% !important;
                    }
                    h1 {
                        font-size: 30px !important;
                        text-align: center;
                        line-height: 120% !important;
                    }
                    h2 {
                        font-size: 26px !important;
                        text-align: center;
                        line-height: 120% !important;
                    }
                    h3 {
                        font-size: 20px !important;
                        text-align: center;
                        line-height: 120% !important;
                    }
                    h1 a {
                        font-size: 30px !important;
                    }
                    h2 a {
                        font-size: 26px !important;
                    }
                    h3 a {
                        font-size: 20px !important;
                    }
                    .es-menu td a {
                        font-size: 16px !important;
                    }
                    .es-header-body p,
                    .es-header-body ul li,
                    .es-header-body ol li,
                    .es-header-body a {
                        font-size: 16px !important;
                    }
                    .es-footer-body p,
                    .es-footer-body ul li,
                    .es-footer-body ol li,
                    .es-footer-body a {
                        font-size: 16px !important;
                    }
                    .es-infoblock p,
                    .es-infoblock ul li,
                    .es-infoblock ol li,
                    .es-infoblock a {
                        font-size: 12px !important;
                    }
                    *[class="gmail-fix"] {
                        display: none !important;
                    }
                    .es-m-txt-c,
                    .es-m-txt-c h1,
                    .es-m-txt-c h2,
                    .es-m-txt-c h3 {
                        text-align: center !important;
                    }
                    .es-m-txt-r,
                    .es-m-txt-r h1,
                    .es-m-txt-r h2,
                    .es-m-txt-r h3 {
                        text-align: right !important;
                    }
                    .es-m-txt-l,
                    .es-m-txt-l h1,
                    .es-m-txt-l h2,
                    .es-m-txt-l h3 {
                        text-align: left !important;
                    }
                    .es-m-txt-r img,
                    .es-m-txt-c img,
                    .es-m-txt-l img {
                        display: inline !important;
                    }
                    .es-button-border {
                        display: block !important;
                    }
                    .es-btn-fw {
                        border-width: 10px 0px !important;
                        text-align: center !important;
                    }
                    .es-adaptive table,
                    .es-btn-fw,
                    .es-btn-fw-brdr,
                    .es-left,
                    .es-right {
                        width: 100% !important;
                    }
                    .es-content table,
                    .es-header table,
                    .es-footer table,
                    .es-content,
                    .es-footer,
                    .es-header {
                        width: 100% !important;
                        max-width: 600px !important;
                    }
                    .es-adapt-td {
                        display: block !important;
                        width: 100% !important;
                    }
                    .adapt-img {
                        width: 100% !important;
                        height: auto !important;
                    }
                    .es-m-p0 {
                        padding: 0px !important;
                    }
                    .es-m-p0r {
                        padding-right: 0px !important;
                    }
                    .es-m-p0l {
                        padding-left: 0px !important;
                    }
                    .es-m-p0t {
                        padding-top: 0px !important;
                    }
                    .es-m-p0b {
                        padding-bottom: 0 !important;
                    }
                    .es-m-p20b {
                        padding-bottom: 20px !important;
                    }
                    .es-mobile-hidden,
                    .es-hidden {
                        display: none !important;
                    }
                    tr.es-desk-hidden,
                    td.es-desk-hidden,
                    table.es-desk-hidden {
                        width: auto !important;
                        overflow: visible !important;
                        float: none !important;
                        max-height: inherit !important;
                        line-height: inherit !important;
                    }
                    tr.es-desk-hidden {
                        display: table-row !important;
                    }
                    table.es-desk-hidden {
                        display: table !important;
                    }
                    td.es-desk-menu-hidden {
                        display: table-cell !important;
                    }
                    .es-menu td {
                        width: 1% !important;
                    }
                    table.es-table-not-adapt,
                    .esd-block-html table {
                        width: auto !important;
                    }
                    table.es-social {
                        display: inline-block !important;
                    }
                    table.es-social td {
                        display: inline-block !important;
                    }
                    a.es-button,
                    button.es-button {
                        font-size: 20px !important;
                        display: block !important;
                        border-width: 15px 25px 15px 25px !important;
                    }
                }
            </style>
        </head>
        <body
            style="
                width: 100%;
                font-family: lato, 'helvetica neue', helvetica, arial, sans-serif;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                padding: 0;
                margin: 0;
            "
        >
            <div class="es-wrapper-color" style="background-color: #f4f4f4">
                <!--[if gte mso 9]>
                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                        <v:fill type="tile" color="#f4f4f4"></v:fill>
                    </v:background>
                <![endif]-->
                <table
                    class="es-wrapper"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        height: 100%;
                        background-repeat: repeat;
                        background-position: center top;
                    "
                >
                    <tr
                        class="gmail-fix"
                        height="0"
                        style="border-collapse: collapse"
                    >
                        <td style="padding: 0; margin: 0">
                            <table
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                                align="center"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                    width: 600px;
                                "
                            >
                                <tr style="border-collapse: collapse">
                                    <td
                                        cellpadding="0"
                                        cellspacing="0"
                                        border="0"
                                        style="
                                            padding: 0;
                                            margin: 0;
                                            line-height: 1px;
                                            min-width: 600px;
                                        "
                                        height="0"
                                    >
                                        <img
                                            src="images/blank.gif"
                                            style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                                max-height: 0px;
                                                min-height: 0px;
                                                min-width: 600px;
                                                width: 600px;
                                            "
                                            alt
                                            width="600"
                                            height="1"
                                        />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr style="border-collapse: collapse">
                        <td valign="top" style="padding: 0; margin: 0">
                            <table
                                class="es-header"
                                cellspacing="0"
                                cellpadding="0"
                                align="center"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                    table-layout: fixed !important;
                                    width: 100%;
                                    background-color: #ec6d64;
                                    background-repeat: repeat;
                                    background-position: center top;
                                "
                            >
                                <tr style="border-collapse: collapse">
                                    <td
                                        align="center"
                                        style="padding: 0; margin: 0"
                                    >
                                        <table
                                            class="es-header-body"
                                            cellspacing="0"
                                            cellpadding="0"
                                            align="center"
                                            style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                border-collapse: collapse;
                                                border-spacing: 0px;
                                                background-color: #ec6d64;
                                                width: 600px;
                                            "
                                        >
                                            <tr style="border-collapse: collapse">
                                                <td
                                                    align="left"
                                                    style="
                                                        margin: 0;
                                                        padding-bottom: 10px;
                                                        padding-left: 10px;
                                                        padding-right: 10px;
                                                        padding-top: 20px;
                                                    "
                                                >
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        style="
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            border-collapse: collapse;
                                                            border-spacing: 0px;
                                                        "
                                                    >
                                                        <tr
                                                            style="
                                                                border-collapse: collapse;
                                                            "
                                                        >
                                                            <td
                                                                valign="top"
                                                                align="center"
                                                                style="
                                                                    padding: 0;
                                                                    margin: 0;
                                                                    width: 580px;
                                                                "
                                                            >
                                                                <table
                                                                    width="100%"
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    role="presentation"
                                                                    style="
                                                                        mso-table-lspace: 0pt;
                                                                        mso-table-rspace: 0pt;
                                                                        border-collapse: collapse;
                                                                        border-spacing: 0px;
                                                                    "
                                                                >
                                                                    <tr
                                                                        style="
                                                                            border-collapse: collapse;
                                                                        "
                                                                    >
                                                                        <td
                                                                            style="
                                                                                margin: 0;
                                                                                padding-left: 10px;
                                                                                padding-right: 10px;
                                                                                padding-top: 25px;
                                                                                padding-bottom: 25px;
                                                                                font-size: 0px;
                                                                            "
                                                                            align="center"
                                                                        >
                                                                            <img
                                                                                src="images/5101614031023790.png"
                                                                                alt
                                                                                style="
                                                                                    display: block;
                                                                                    border: 0;
                                                                                    outline: none;
                                                                                    text-decoration: none;
                                                                                    -ms-interpolation-mode: bicubic;
                                                                                "
                                                                                width="40"
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table
                                class="es-content"
                                cellspacing="0"
                                cellpadding="0"
                                align="center"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                    table-layout: fixed !important;
                                    width: 100%;
                                "
                            >
                                <tr style="border-collapse: collapse">
                                    <td
                                        style="
                                            padding: 0;
                                            margin: 0;
                                            background-color: #ec6d64;
                                        "
                                        bgcolor="#ec6d64"
                                        align="center"
                                    >
                                        <table
                                            class="es-content-body"
                                            style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                border-collapse: collapse;
                                                border-spacing: 0px;
                                                background-color: transparent;
                                                width: 600px;
                                            "
                                            cellspacing="0"
                                            cellpadding="0"
                                            align="center"
                                        >
                                            <tr style="border-collapse: collapse">
                                                <td
                                                    align="left"
                                                    style="padding: 0; margin: 0"
                                                >
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        style="
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            border-collapse: collapse;
                                                            border-spacing: 0px;
                                                        "
                                                    >
                                                        <tr
                                                            style="
                                                                border-collapse: collapse;
                                                            "
                                                        >
                                                            <td
                                                                valign="top"
                                                                align="center"
                                                                style="
                                                                    padding: 0;
                                                                    margin: 0;
                                                                    width: 600px;
                                                                "
                                                            >
                                                                <table
                                                                    style="
                                                                        mso-table-lspace: 0pt;
                                                                        mso-table-rspace: 0pt;
                                                                        border-collapse: separate;
                                                                        border-spacing: 0px;
                                                                        background-color: #ffffff;
                                                                        border-radius: 4px;
                                                                    "
                                                                    width="100%"
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    bgcolor="#ffffff"
                                                                    role="presentation"
                                                                >
                                                                    <tr
                                                                        style="
                                                                            border-collapse: collapse;
                                                                        "
                                                                    >
                                                                        <td
                                                                            align="center"
                                                                            style="
                                                                                margin: 0;
                                                                                padding-bottom: 5px;
                                                                                padding-left: 30px;
                                                                                padding-right: 30px;
                                                                                padding-top: 35px;
                                                                            "
                                                                        >
                                                                            <h1
                                                                                style="
                                                                                    margin: 0;
                                                                                    line-height: 58px;
                                                                                    mso-line-height-rule: exactly;
                                                                                    font-family: lato,
                                                                                        'helvetica neue',
                                                                                        helvetica,
                                                                                        arial,
                                                                                        sans-serif;
                                                                                    font-size: 48px;
                                                                                    font-style: normal;
                                                                                    font-weight: normal;
                                                                                    color: #111111;
                                                                                "
                                                                            >
                                                                            Шановний, ${username}!
                                                                            </h1>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        style="
                                                                            border-collapse: collapse;
                                                                        "
                                                                    >
                                                                        <td
                                                                            style="
                                                                                margin: 0;
                                                                                padding-top: 5px;
                                                                                padding-bottom: 5px;
                                                                                padding-left: 20px;
                                                                                padding-right: 20px;
                                                                                font-size: 0;
                                                                            "
                                                                            bgcolor="#ffffff"
                                                                            align="center"
                                                                        >
                                                                            <table
                                                                                width="100%"
                                                                                height="100%"
                                                                                cellspacing="0"
                                                                                cellpadding="0"
                                                                                border="0"
                                                                                role="presentation"
                                                                                style="
                                                                                    mso-table-lspace: 0pt;
                                                                                    mso-table-rspace: 0pt;
                                                                                    border-collapse: collapse;
                                                                                    border-spacing: 0px;
                                                                                "
                                                                            >
                                                                                <tr
                                                                                    style="
                                                                                        border-collapse: collapse;
                                                                                    "
                                                                                >
                                                                                    <td
                                                                                        style="
                                                                                            padding: 0;
                                                                                            margin: 0;
                                                                                            border-bottom: 1px
                                                                                                solid
                                                                                                #ffffff;
                                                                                            background: #ffffff
                                                                                                none
                                                                                                repeat
                                                                                                scroll
                                                                                                0%
                                                                                                0%;
                                                                                            height: 1px;
                                                                                            width: 100%;
                                                                                            margin: 0px;
                                                                                        "
                                                                                    ></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table
                                class="es-content"
                                cellspacing="0"
                                cellpadding="0"
                                align="center"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                    table-layout: fixed !important;
                                    width: 100%;
                                "
                            >
                                <tr style="border-collapse: collapse">
                                    <td
                                        align="center"
                                        style="padding: 0; margin: 0"
                                    >
                                        <table
                                            class="es-content-body"
                                            style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                border-collapse: collapse;
                                                border-spacing: 0px;
                                                background-color: #ffffff;
                                                width: 600px;
                                            "
                                            cellspacing="0"
                                            cellpadding="0"
                                            bgcolor="#ffffff"
                                            align="center"
                                        >
                                            <tr style="border-collapse: collapse">
                                                <td
                                                    align="left"
                                                    style="padding: 0; margin: 0"
                                                >
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        style="
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            border-collapse: collapse;
                                                            border-spacing: 0px;
                                                        "
                                                    >
                                                        <tr
                                                            style="
                                                                border-collapse: collapse;
                                                            "
                                                        >
                                                            <td
                                                                valign="top"
                                                                align="center"
                                                                style="
                                                                    padding: 0;
                                                                    margin: 0;
                                                                    width: 600px;
                                                                "
                                                            >
                                                                <table
                                                                    style="
                                                                        mso-table-lspace: 0pt;
                                                                        mso-table-rspace: 0pt;
                                                                        border-collapse: collapse;
                                                                        border-spacing: 0px;
                                                                        background-color: #ffffff;
                                                                    "
                                                                    width="100%"
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    bgcolor="#ffffff"
                                                                    role="presentation"
                                                                >
                                                                    <tr
                                                                        style="
                                                                            border-collapse: collapse;
                                                                        "
                                                                    >
                                                                        <td
                                                                            class="es-m-txt-l"
                                                                            bgcolor="#ffffff"
                                                                            align="left"
                                                                            style="
                                                                                margin: 0;
                                                                                padding-bottom: 15px;
                                                                                padding-top: 20px;
                                                                                padding-left: 30px;
                                                                                padding-right: 30px;
                                                                            "
                                                                        >
                                                                            <p
                                                                                style="
                                                                                    margin: 0;
                                                                                    -webkit-text-size-adjust: none;
                                                                                    -ms-text-size-adjust: none;
                                                                                    mso-line-height-rule: exactly;
                                                                                    font-size: 18px;
                                                                                    font-family: lato,
                                                                                        'helvetica neue',
                                                                                        helvetica,
                                                                                        arial,
                                                                                        sans-serif;
                                                                                    line-height: 27px;
                                                                                    color: #666666;
                                                                                "
                                                                            >
                                                                                Вас додали до проєкту ${name}. Тепер Ви можете брати в ньому участь.<br />
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr style="border-collapse: collapse">
                                                <td
                                                    align="left"
                                                    style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-bottom: 20px;
                                                        padding-left: 30px;
                                                        padding-right: 30px;
                                                    "
                                                >
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        style="
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            border-collapse: collapse;
                                                            border-spacing: 0px;
                                                        "
                                                    >
                                                        <tr
                                                            style="
                                                                border-collapse: collapse;
                                                            "
                                                        >
                                                            <td
                                                                valign="top"
                                                                align="center"
                                                                style="
                                                                    padding: 0;
                                                                    margin: 0;
                                                                    width: 540px;
                                                                "
                                                            >
                                                                <table
                                                                    width="100%"
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    role="presentation"
                                                                    style="
                                                                        mso-table-lspace: 0pt;
                                                                        mso-table-rspace: 0pt;
                                                                        border-collapse: collapse;
                                                                        border-spacing: 0px;
                                                                    "
                                                                >
                                                                    <tr
                                                                        style="
                                                                            border-collapse: collapse;
                                                                        "
                                                                    >
                                                                        <td
                                                                            align="center"
                                                                            style="
                                                                                margin: 0;
                                                                                padding-left: 10px;
                                                                                padding-right: 10px;
                                                                                padding-top: 40px;
                                                                                padding-bottom: 40px;
                                                                            "
                                                                        >
                                                                            <span
                                                                                class="es-button-border"
                                                                                style="
                                                                                    border-style: solid;
                                                                                    border-color: #ec6d64;
                                                                                    background: #ec6d64
                                                                                        none
                                                                                        repeat
                                                                                        scroll
                                                                                        0%
                                                                                        0%;
                                                                                    border-width: 1px;
                                                                                    display: inline-block;
                                                                                    border-radius: 2px;
                                                                                    width: auto;
                                                                                "
                                                                                ><a
                                                                                    href=${link}
                                                                                    class="es-button"
                                                                                    target="_blank"
                                                                                    style="
                                                                                        mso-style-priority: 100 !important;
                                                                                        text-decoration: none;
                                                                                        -webkit-text-size-adjust: none;
                                                                                        -ms-text-size-adjust: none;
                                                                                        mso-line-height-rule: exactly;
                                                                                        font-family: helvetica,
                                                                                            'helvetica neue',
                                                                                            arial,
                                                                                            verdana,
                                                                                            sans-serif;
                                                                                        font-size: 20px;
                                                                                        color: #ffffff;
                                                                                        border-style: solid;
                                                                                        border-color: #ec6d64;
                                                                                        border-width: 15px
                                                                                            25px;
                                                                                        display: inline-block;
                                                                                        background: #ec6d64
                                                                                            none
                                                                                            repeat
                                                                                            scroll
                                                                                            0%
                                                                                            0%;
                                                                                        border-radius: 2px;
                                                                                        font-weight: normal;
                                                                                        font-style: normal;
                                                                                        line-height: 24px;
                                                                                        width: auto;
                                                                                        text-align: center;
                                                                                    "
                                                                                    >Перейти до проєкту</a
                                                                                ></span
                                                                            >
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table
                                class="es-content"
                                cellspacing="0"
                                cellpadding="0"
                                align="center"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                    table-layout: fixed !important;
                                    width: 100%;
                                "
                            >
                                <tr style="border-collapse: collapse">
                                    <td
                                        align="center"
                                        style="padding: 0; margin: 0"
                                    >
                                        <table
                                            class="es-content-body"
                                            style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                border-collapse: collapse;
                                                border-spacing: 0px;
                                                background-color: transparent;
                                                width: 600px;
                                            "
                                            cellspacing="0"
                                            cellpadding="0"
                                            align="center"
                                        >
                                            <tr style="border-collapse: collapse">
                                                <td
                                                    align="left"
                                                    style="padding: 0; margin: 0"
                                                >
                                                    <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        style="
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            border-collapse: collapse;
                                                            border-spacing: 0px;
                                                        "
                                                    >
                                                        <tr
                                                            style="
                                                                border-collapse: collapse;
                                                            "
                                                        >
                                                            <td
                                                                valign="top"
                                                                align="center"
                                                                style="
                                                                    padding: 0;
                                                                    margin: 0;
                                                                    width: 600px;
                                                                "
                                                            >
                                                                <table
                                                                    width="100%"
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    role="presentation"
                                                                    style="
                                                                        mso-table-lspace: 0pt;
                                                                        mso-table-rspace: 0pt;
                                                                        border-collapse: collapse;
                                                                        border-spacing: 0px;
                                                                    "
                                                                >
                                                                    <tr
                                                                        style="
                                                                            border-collapse: collapse;
                                                                        "
                                                                    >
                                                                        <td
                                                                            style="
                                                                                margin: 0;
                                                                                padding-top: 10px;
                                                                                padding-bottom: 20px;
                                                                                padding-left: 20px;
                                                                                padding-right: 20px;
                                                                                font-size: 0;
                                                                            "
                                                                            align="center"
                                                                        >
                                                                            <table
                                                                                width="100%"
                                                                                height="100%"
                                                                                cellspacing="0"
                                                                                cellpadding="0"
                                                                                border="0"
                                                                                role="presentation"
                                                                                style="
                                                                                    mso-table-lspace: 0pt;
                                                                                    mso-table-rspace: 0pt;
                                                                                    border-collapse: collapse;
                                                                                    border-spacing: 0px;
                                                                                "
                                                                            >
                                                                                <tr
                                                                                    style="
                                                                                        border-collapse: collapse;
                                                                                    "
                                                                                >
                                                                                    <td
                                                                                        style="
                                                                                            padding: 0;
                                                                                            margin: 0;
                                                                                            border-bottom: 1px
                                                                                                solid
                                                                                                #f4f4f4;
                                                                                            background: #ffffff
                                                                                                none
                                                                                                repeat
                                                                                                scroll
                                                                                                0%
                                                                                                0%;
                                                                                            height: 1px;
                                                                                            width: 100%;
                                                                                            margin: 0px;
                                                                                        "
                                                                                    ></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
    </html>
    `;

module.exports = inviteTemplate;
