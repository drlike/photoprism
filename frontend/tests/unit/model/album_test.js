import Album from "model/album";
import MockAdapter from "axios-mock-adapter";
import Api from "common/api";

let chai = require("chai/chai");
let assert = chai.assert;

const mock = new MockAdapter(Api);

mock
    .onPost().reply(200)
    .onDelete().reply(200);

describe("model/album", () => {
    it("should get album entity name",  () => {
        const values = {id: 5, Title: "Christmas 2019", Slug: "christmas-2019"};
        const album = new Album(values);
        const result = album.getEntityName();
        assert.equal(result, "christmas-2019");
    });

    it("should get album id",  () => {
        const values = {id: 5, Title: "Christmas 2019", Slug: "christmas-2019", UID: 66};
        const album = new Album(values);
        const result = album.getId();
        assert.equal(result, "66");
    });

    it("should get album title",  () => {
        const values = {id: 5, Title: "Christmas 2019", Slug: "christmas-2019"};
        const album = new Album(values);
        const result = album.getTitle();
        assert.equal(result, "Christmas 2019");
    });

    it("should get thumbnail url",  () => {
        const values = {id: 5, Title: "Christmas 2019", Slug: "christmas-2019", UID: 66};
        const album = new Album(values);
        const result = album.thumbnailUrl("xyz");
        assert.equal(result, "/api/v1/albums/66/t/static/xyz");
    });

    it("should get thumbnail src set",  () => {
        const values = {id: 5, Title: "Christmas 2019", Slug: "christmas-2019", UID: 66};
        const album = new Album(values);
        const result = album.thumbnailSrcset("");
        assert.equal(result, "/api/v1/albums/66/t/static/fit_720 720w, /api/v1/albums/66/t/static/fit_1280 1280w, /api/v1/albums/66/t/static/fit_1920 1920w, /api/v1/albums/66/t/static/fit_2560 2560w, /api/v1/albums/66/t/static/fit_3840 3840w");
    });

    it("should get thumbnail sizes",  () => {
        const values = {id: 5, Title: "Christmas 2019", Slug: "christmas-2019", CreatedAt: "2012-07-08T14:45:39Z"};
        const album = new Album(values);
        const result = album.thumbnailSizes();
        assert.equal(result, "(min-width: 2560px) 3840px, (min-width: 1920px) 2560px, (min-width: 1280px) 1920px, (min-width: 720px) 1280px, 720px");
    });

    it("should get date string",  () => {
        const values = {ID: 5, Title: "Christmas 2019", Slug: "christmas-2019", CreatedAt: "2012-07-08T14:45:39Z"};
        const album = new Album(values);
        const result = album.getDateString();
        assert.equal(result, "Jul 8, 2012, 2:45 PM");
    });

    it("should get model name",  () => {
        const result = Album.getModelName();
        assert.equal(result, "Album");
    });

    it("should get collection resource",  () => {
        const result = Album.getCollectionResource();
        assert.equal(result, "albums");
    });

    it("should like album",  () => {
        const values = {id: 5, Title: "Christmas 2019", Slug: "christmas-2019", Favorite: false};
        const album = new Album(values);
        assert.equal(album.Favorite, false);
        album.like();
        assert.equal(album.Favorite, true);
    });

    it("should unlike album",  () => {
        const values = {id: 5, Title: "Christmas 2019", Slug: "christmas-2019", Favorite: true};
        const album = new Album(values);
        assert.equal(album.Favorite, true);
        album.unlike();
        assert.equal(album.Favorite, false);
    });

    it("should toggle like",  () => {
        const values = {id: 5, Title: "Christmas 2019", Slug: "christmas-2019", Favorite: true};
        const album = new Album(values);
        assert.equal(album.Favorite, true);
        album.toggleLike();
        assert.equal(album.Favorite, false);
        album.toggleLike();
        assert.equal(album.Favorite, true);
    });
});
