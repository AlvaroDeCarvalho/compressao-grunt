module.exports  = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        less:{
            development:{
                files:{
                    'dev/styles/main.css':'src/styles/main.less'
                }
            },
            production:{
                options:{
                    compressed:true
                },
                files:{
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },
        watch:{
            less:{
                files:['src/styles/**/*.less'],
                tasks:['less:development']
            }
        },
        replace:{
            dev:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_CSS',
                            replement:'./styles/main.css'
                        },
                        {
                            match:'ENDERECO_CSS',
                            replement:'../src/scripts/main.js'
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['src/index.html'],
                        dest:['dev/']
                    }
                ]
            },
            dist:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_CSS',
                            replement:'./styles/main.min.css'
                        },
                        {
                            match:'ENDERECO_CSS',
                            replement:'./scripts/main.min.js'
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        //no exercicio nao foi pedido para comprimir arquivos HTML
                        src:['src/index.html'],
                        dest:['dist/']
                    }
                ]
            }
        },
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js':'src/scripts/main.js'
                }
            }
        }

    })
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-replace')
    grunt.loadNpmTasks('grunt-contrib-uglify')

    grunt.registerTask('default',['watch'])
    grunt.registerTask('build', ['less:production','replace:dist','uglify'])
}