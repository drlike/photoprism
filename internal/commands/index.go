package commands

import (
	"context"
	"time"

	"github.com/photoprism/photoprism/internal/classify"
	"github.com/photoprism/photoprism/internal/config"
	"github.com/photoprism/photoprism/internal/nsfw"
	"github.com/photoprism/photoprism/internal/photoprism"
	"github.com/urfave/cli"
)

// Re-indexes all photos in originals directory (photo library)
var IndexCommand = cli.Command{
	Name:   "index",
	Usage:  "Re-indexes all originals",
	Action: indexAction,
}

func indexAction(ctx *cli.Context) error {
	start := time.Now()

	conf := config.NewConfig(ctx)

	if err := conf.CreateDirectories(); err != nil {
		return err
	}

	cctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	if err := conf.Init(cctx); err != nil {
		return err
	}

	conf.MigrateDb()
	log.Infof("indexing photos in %s", conf.OriginalsPath())

	if conf.ReadOnly() {
		log.Infof("read-only mode enabled")
	}

	tf := classify.New(conf.ResourcesPath(), conf.TensorFlowDisabled())
	nd := nsfw.New(conf.NSFWModelPath())

	ind := photoprism.NewIndex(conf, tf, nd)

	opt := photoprism.IndexOptionsAll()
	files := ind.Start(opt)

	elapsed := time.Since(start)

	log.Infof("indexed %d files in %s", len(files), elapsed)

	conf.Shutdown()

	return nil
}
